$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$package = Get-ChildItem -LiteralPath $root -Filter "papainsight-domain-deploy-*.tar.gz" |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

if (-not $package) {
  throw "No papainsight-domain-deploy tar.gz file was found."
}

Write-Host "Using deploy package: $($package.FullName)"
Write-Host "Uploading to server. Enter the server password if prompted."
scp "$($package.FullName)" root@158.247.241.188:/tmp/papainsight-domain-deploy.tar.gz

$remoteScript = @'
set -e

echo "1) Prepare deploy folders"
rm -rf /tmp/papainsight-domain-deploy
mkdir -p /tmp/papainsight-domain-deploy
tar -xzf /tmp/papainsight-domain-deploy.tar.gz -C /tmp/papainsight-domain-deploy
test -d /tmp/papainsight-domain-deploy/assets
test -f /tmp/papainsight-domain-deploy/data/materials-state.json

echo "2) Backup current production files"
backup_dir="/var/backups/papainsight-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$backup_dir"
if [ -d /var/www/papainsight ]; then
  cp -a /var/www/papainsight/. "$backup_dir"/
fi
echo "Backup: $backup_dir"

echo "3) Copy latest frontend files"
mkdir -p /var/www/papainsight
cp -a /tmp/papainsight-domain-deploy/index.html /var/www/papainsight/
cp -a /tmp/papainsight-domain-deploy/script.js /var/www/papainsight/
cp -a /tmp/papainsight-domain-deploy/styles.css /var/www/papainsight/
cp -a /tmp/papainsight-domain-deploy/dev-server.js /var/www/papainsight/
cp -a /tmp/papainsight-domain-deploy/favicon.svg /var/www/papainsight/
cp -a /tmp/papainsight-domain-deploy/favicon.ico /var/www/papainsight/
rm -rf /var/www/papainsight/assets
cp -a /tmp/papainsight-domain-deploy/assets /var/www/papainsight/assets
if [ -d /tmp/papainsight-domain-deploy/landing-preview ]; then
  rm -rf /var/www/papainsight/landing-preview
  cp -a /tmp/papainsight-domain-deploy/landing-preview /var/www/papainsight/landing-preview
fi

echo "4) Preserve and sync materials data"
mkdir -p /var/www/papainsight/data
mkdir -p /var/www/papainsight/data/material-assets
if [ -d /tmp/papainsight-domain-deploy/data/material-assets ]; then
  cp -a /tmp/papainsight-domain-deploy/data/material-assets/. /var/www/papainsight/data/material-assets/
fi
package_data="/tmp/papainsight-domain-deploy/data/materials-state.json"
server_data="/var/www/papainsight/data/materials-state.json"
package_count=$(node -e "const fs=require('fs');const s=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));console.log(Array.isArray(s.materials)?s.materials.length:0)" "$package_data")
server_count=0
if [ -f "$server_data" ]; then
  server_count=$(node -e "try{const fs=require('fs');const s=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));console.log(Array.isArray(s.materials)?s.materials.length:0)}catch(e){console.log(0)}" "$server_data")
fi
echo "Package materials: $package_count"
echo "Server materials: $server_count"
if [ ! -f "$server_data" ]; then
  cp -a "$package_data" "$server_data"
  echo "Materials data initialized from package."
else
  echo "Server materials data already exists. Keeping server data."
fi

echo "5) Configure Node API service"
cat >/etc/systemd/system/papainsight.service <<'SERVICE'
[Unit]
Description=Papa Insight web and materials API
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/papainsight
ExecStart=/usr/bin/node /var/www/papainsight/dev-server.js
Restart=always
RestartSec=3
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
SERVICE

systemctl daemon-reload
systemctl enable papainsight.service >/dev/null
systemctl restart papainsight.service
sleep 1
systemctl --no-pager --full status papainsight.service | head -20

echo "6) Add Nginx API proxy location"
python3 - <<'PY'
from pathlib import Path

insert = """
    location = /api/materials {
        proxy_pass http://127.0.0.1:4175/api/materials;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 80m;
        add_header Cache-Control "no-store, max-age=0" always;
    }
"""

roots = [Path("/etc/nginx/sites-enabled"), Path("/etc/nginx/conf.d")]
for root in roots:
    if not root.exists():
        continue
    for path in root.iterdir():
        if not path.is_file():
            continue
        text = path.read_text(errors="ignore")
        if "papainsight.co.kr" not in text:
            continue
        if "location = /api/materials" in text:
            continue
        backup = path.with_suffix(path.suffix + ".bak-papainsight-api")
        backup.write_text(text)
        lines = text.splitlines(True)
        output = []
        in_server = False
        depth = 0
        pending_insert = False
        for line in lines:
            stripped = line.strip()
            if stripped.startswith("server") and "{" in line:
                in_server = True
                depth = line.count("{") - line.count("}")
                pending_insert = False
                output.append(line)
                continue
            if in_server:
                depth += line.count("{") - line.count("}")
                output.append(line)
                if "server_name" in line and "papainsight.co.kr" in line:
                    pending_insert = True
                if pending_insert and stripped.endswith(";"):
                    output.append(insert)
                    pending_insert = False
                if depth <= 0:
                    in_server = False
                    pending_insert = False
                continue
            output.append(line)
        path.write_text("".join(output))
        print(f"Updated {path}")
PY

echo "7) Test and reload Nginx"
nginx -t
systemctl reload nginx

echo "8) Verify API and domain"
curl -sS http://127.0.0.1:4175/api/materials | node -e "const fs=require('fs');const s=JSON.parse(fs.readFileSync(0,'utf8'));console.log('Local API materials:', (s.materials||[]).length)"
curl -sS https://papainsight.co.kr/api/materials | node -e "const fs=require('fs');const s=JSON.parse(fs.readFileSync(0,'utf8'));console.log('Public API materials:', (s.materials||[]).length)"
curl -sSI https://papainsight.co.kr/ | head -20

echo "DEPLOY_DONE"
'@

Write-Host "Running remote deploy. Enter the server password again if prompted."
$remoteScript | ssh root@158.247.241.188 "bash -s"

Write-Host "Deployment script finished."
