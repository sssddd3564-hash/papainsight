# 백업 및 복구 가이드

## 로컬 백업

작업 폴더:

```text
C:\Users\USER\Documents\파파 인사이트
```

운영 배포 압축 생성:

```powershell
Compress-Archive -Path index.html,styles.css,script.js -DestinationPath papainsight-production.zip -Force
```

전체 작업 백업 압축 생성:

```powershell
Compress-Archive -Path * -DestinationPath papainsight-workspace-backup.zip -Force
```

## 서버 업로드

```powershell
scp "C:\Users\USER\Documents\파파 인사이트\papainsight-production.zip" root@158.247.241.188:/tmp/papainsight-production.zip
```

## 서버 배포 경로

```text
/var/www/papainsight
```

## 서버 반영 확인

```bash
nginx -t
systemctl reload nginx
```

## GitHub 백업 원칙

Git이 설치된 PC에서는 아래 흐름을 사용한다.

```powershell
git status
git add .
git commit -m "Update papainsight MVP"
git push
```

## 복구 원칙

- 운영 서버 수정 전에는 기존 파일을 백업한다.
- Nginx 설정 파일 수정 전에는 설정 파일을 `/root` 아래에 백업한다.
- `/etc/nginx/sites-enabled` 안에 백업 파일을 두지 않는다.
