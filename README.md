# 파파인사이트

파파인사이트는 파파컴퍼니 ERP 홈페이지입니다.  
현재 1차 MVP는 직원 로그인 이후 아래 두 개의 대시보드를 사용하는 구조입니다.

## MVP 범위

- 로그인 화면
- 영업자료 대시보드
- 거래처 관리 대시보드
- 정적 배포 가능한 HTML/CSS/JavaScript 구조

## 로컬 실행

```powershell
node dev-server.js
```

브라우저에서 접속:

```text
http://localhost:4175/
```

테스트 계정:

```text
아이디: papa.admin
비밀번호: 1234
```

## 운영 도메인

```text
https://papainsight.co.kr/
```

## GitHub 저장소

앞으로 파파인사이트 작업은 아래 GitHub 계정의 저장소 기준으로 관리합니다.

```text
https://github.com/sssddd3564-hash/papainsight
```

현재 서버 배포 경로:

```text
/var/www/papainsight
```

Nginx 설정 파일:

```text
/etc/nginx/sites-enabled/papainsight.co.kr
```

## 파일 구조

```text
index.html        화면 구조
styles.css        디자인
script.js         로그인, 메뉴 전환, 샘플 데이터 렌더링
assets/          영업자료 이미지 및 정적 파일
dev-server.js     로컬 확인용 서버
README.md         프로젝트 안내
WORKING_RULES.md  작업 운영 규칙
CHANGELOG.md      작업 이력
ERROR_LOG.md      오류 및 해결 기록
BACKUP_GUIDE.md   백업/복구 가이드
```

## 다음 개발 후보

- 실제 직원 계정 로그인
- 관리자 페이지
- 영업자료 등록/수정/삭제
- 사업자등록증, 플레이스 이미지표 자료 관리
- 이미지 자료 다운로드/복사
- 카테고리별 이미지 등록 팝업
- 파파AI 문서 대시보드
- 거래처 등록/수정/삭제
- B2B/B2C 필터
- 연장 예정 알림
- 데이터베이스 연결
- 서버 배포 자동화

## 파파AI 포함 문서

출처 저장소:

```text
https://github.com/lcm67088-tech/PAPAchatbot
```

현재 파파인사이트에는 아래 두 문서만 포함합니다.

```text
assets/papa-ai/blog-executor-specs.md
assets/papa-ai/product-specs.md
assets/papa-ai/blog-executor-specs.html
assets/papa-ai/product-specs.html
```

화면 표시에는 표 구조가 보존된 `.html` 파일을 사용합니다.
