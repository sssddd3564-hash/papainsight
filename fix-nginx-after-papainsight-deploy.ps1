$ErrorActionPreference = "Stop"

Write-Host "Fixing Nginx backup config issue. Enter the server password if prompted."

$remoteScript = @'
set -e

echo "1) Move backup configs out of sites-enabled"
disabled_dir="/var/backups/papainsight-nginx-disabled-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$disabled_dir"
find /etc/nginx/sites-enabled -maxdepth 1 -type f \( -name "*.bak*" -o -name "*cachefix*" \) -print -exec mv {} "$disabled_dir"/ \;
echo "Moved backup configs to: $disabled_dir"

echo "2) Test Nginx"
nginx -t

echo "3) Reload Nginx"
systemctl reload nginx

echo "4) Verify API and domain"
curl -sS http://127.0.0.1:4175/api/materials | node -e "const fs=require('fs');const s=JSON.parse(fs.readFileSync(0,'utf8'));console.log('Local API materials:', (s.materials||[]).length)"
curl -sS https://papainsight.co.kr/api/materials | node -e "const fs=require('fs');const s=JSON.parse(fs.readFileSync(0,'utf8'));console.log('Public API materials:', (s.materials||[]).length)"
curl -sSI https://papainsight.co.kr/ | head -20

echo "DEPLOY_DONE"
'@

$remoteScript | ssh root@158.247.241.188 "bash -s"
