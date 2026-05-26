# 오류 기록

작업 중 발생한 오류와 해결 방법을 기록합니다.

## 2026-05-26

### SSH 접속 명령 오류

명령어:

```powershell
ssh @서버IP
```

문제:

PowerShell에서 `@`가 잘못 해석되어 접속 실패.

해결:

```powershell
ssh root@서버IP
```

기록:

SSH는 항상 `사용자명@서버IP` 형식으로 접속한다.

### PowerShell에 Nginx 설정을 직접 입력한 문제

문제:

`server { ... }`, `EOF`, `nginx -t` 등을 로컬 PowerShell에서 직접 실행하여 오류 발생.

해결:

PowerShell에서 서버로 명령을 전달할 때는 아래 형식을 사용한다.

```powershell
@'
서버에서 실행할 bash 명령어
'@ | ssh root@서버IP "bash -s"
```

기록:

Nginx 설정 명령은 서버 SSH 안에서 실행하거나, PowerShell에서 SSH 파이프로 전달한다.

### Nginx reload 실패

문제:

Windows 줄바꿈 때문에 `nginx`가 `nginx\x0d`처럼 인식되어 reload 실패.

해결:

한 줄 SSH 명령으로 다시 실행.

```powershell
ssh root@서버IP "nginx -t; systemctl reload nginx"
```

기록:

PowerShell에서 여러 줄 명령 전달 시 줄바꿈 문제를 주의한다.

### Nginx 백업 설정 파일 충돌

문제:

`/etc/nginx/sites-enabled` 안에 백업 파일이 남아 Nginx가 같이 읽으면서 `server_name` 충돌 경고 발생.

해결:

백업 파일은 `/root` 등 Nginx가 읽지 않는 위치로 이동한다.

```bash
mv /etc/nginx/sites-enabled/백업파일 /root/백업파일
```

기록:

`sites-enabled` 폴더 안에는 실제 활성화할 설정 파일만 둔다.

### GitHub push 실패: Repository not found

명령어:

```powershell
git push -u origin main
```

문제:

```text
remote: Repository not found.
fatal: repository 'https://github.com/sssddd3564-hash/papainsight.git/' not found
```

원인:

`sssddd3564-hash/papainsight` GitHub 저장소가 아직 생성되지 않았거나, 현재 인증된 GitHub 계정에 해당 저장소 접근 권한이 없음.

해결:

GitHub에서 `sssddd3564-hash` 계정으로 빈 저장소 `papainsight`를 먼저 생성한다. 생성 시 README, .gitignore, license는 추가하지 않는다.

기록:

원격 저장소가 실제로 생성된 뒤 다시 push한다.
