# 파파인사이트

파파인사이트는 파파컴퍼니 ERP 홈페이지입니다. 현재는 1차 `MVP`(엠브이피: 최소 기능 제품) 단계이며, 직원 로그인 후 내부 대시보드를 사용하는 구조입니다.

## 로컬 실행

```powershell
node dev-server.js
```

브라우저 접속 주소:

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

```text
https://github.com/sssddd3564-hash/papainsight
```

## 현재 기능

- 직원 로그인
- 영업자료 (이미지)
  - 카테고리별 이미지 등록
  - 이미지 다운로드/복사
  - 등록자 표시
  - 삭제 처리 및 삭제 기록
  - 카테고리 접기/펼치기
  - 이미지 카드 펼쳐보기
- 영업자료 (텍스트)
  - 기존 파파AI 자료를 텍스트 영업자료 메뉴로 재구성
  - PAPAchatbot 문서 2개를 표 중심으로 표시
- 거래처 관리
  - 담당자: 이신, 정완, 현민, 오찬, 도영
  - B2C / B2B 구분
  - 거래중 / 상담중 / 대기 상태 구분
- 정산관리
  - 준비중 화면 표시

## 파일 구조

```text
index.html        화면 구조
styles.css        화면 스타일
script.js         로그인, 메뉴 전환, 자료 등록/삭제, 거래처 화면 동작
assets/           영업자료 이미지와 문서 파일
landing-preview/  랜딩페이지 로컬 미리보기 파일
dev-server.js     로컬 확인용 서버
README.md         프로젝트 실행 안내
AGENTS.md         Codex 작업 수칙
PROJECT_NOTES.md  프로젝트 기획과 확정 내용
WORKING_RULES.md  작업 운영 규칙
CHANGELOG.md      작업 변경 이력
ERROR_LOG.md      오류와 해결 기록
BACKUP_GUIDE.md   백업/복구 가이드
```

## 운영 주의사항

- 현재 영업자료 이미지 등록/삭제 기록은 브라우저 `localStorage`(로컬스토리지: 브라우저 내부 저장소)에 저장됩니다.
- 여러 직원이 같은 자료를 공유하려면 백엔드와 `DB`(디비: 데이터를 저장하고 관리하는 데이터베이스)가 필요합니다.
- `GitHub`(깃허브: 코드 저장소 서비스) 저장, `commit`(커밋: 변경 내용을 저장소 기록으로 확정), `push`(푸시: 원격 저장소에 업로드)는 사용자 승인 후 진행합니다.

## 브라우저 미리보기

- 오른쪽 브라우저 확인용 주소: `http://127.0.0.1:4175/?top-switcher=2`
- 상단 툴바에서 `내부 ERP`와 `랜딩페이지`를 전환해 한 화면에서 확인합니다.
- `데스크톱`, `태블릿`, `모바일`, 직접 `px`(픽셀: 화면 너비 단위) 입력으로 반응형 화면을 확인합니다.

## 서버 정보

```text
서버 IP: 158.247.241.188
배포 경로: /var/www/papainsight
Nginx 설정: /etc/nginx/sites-enabled/papainsight.co.kr
```

## 현재 버전

```text
v0.1
```

로컬 확인 주소:

```text
http://localhost:4175/?v=0.1-20260528
```

운영 도메인 배포 후 확인 주소:

```text
https://papainsight.co.kr/?v=0.1-20260528
```
