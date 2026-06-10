$ErrorActionPreference = "Stop"

Write-Host "Recovering Papa Insight materials if a backup has more records. Enter the server password if prompted."

$remoteScript = @'
set -e

current="/var/www/papainsight/data/materials-state.json"

count_file() {
  node -e "try{const fs=require('fs');const s=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));console.log(Array.isArray(s.materials)?s.materials.length:0)}catch(e){console.log(0)}" "$1"
}

current_count=0
if [ -f "$current" ]; then
  current_count=$(count_file "$current")
fi

echo "Current materials: $current_count"
best_file=""
best_dir=""
best_count="$current_count"

for file in /var/backups/papainsight-*/data/materials-state.json; do
  [ -f "$file" ] || continue
  count=$(count_file "$file")
  echo "Backup candidate: $file => $count"
  if [ "$count" -gt "$best_count" ]; then
    best_count="$count"
    best_file="$file"
    best_dir="$(dirname "$(dirname "$file")")"
  fi
done

if [ -n "$best_file" ]; then
  safety="/var/backups/papainsight-data-safety-$(date +%Y%m%d-%H%M%S)"
  mkdir -p "$safety"
  cp -a /var/www/papainsight/data "$safety"/
  echo "Safety backup: $safety"
  cp -a "$best_file" "$current"
  if [ -d "$best_dir/data/material-assets" ]; then
    mkdir -p /var/www/papainsight/data/material-assets
    cp -a "$best_dir/data/material-assets/." /var/www/papainsight/data/material-assets/
  fi
  systemctl restart papainsight.service
  sleep 1
  echo "Restored materials from backup: $best_count"
else
  echo "No backup with more materials found. Keeping current data."
fi

curl -sS https://papainsight.co.kr/api/materials | node -e "const fs=require('fs');const s=JSON.parse(fs.readFileSync(0,'utf8'));console.log('Public materials:', (s.materials||[]).length)"
echo "RECOVERY_DONE"
'@

$remoteScript | ssh root@158.247.241.188 "bash -s"
