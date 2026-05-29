# B2CRanding

파파컴퍼니 B2C 랜딩 페이지 정적 배포 파일입니다.

## Files

- `index.html`: landing page
- `styles.css`: page styles
- `script.js`: interactions and Google Sheets lead form submission
- `assets/`: images used by the landing page
- `ops/google-sheet-submit.apps-script.gs`: Google Apps Script source for the lead form receiver

## Lead Form

The consultation form posts to the deployed Google Apps Script web app configured in `script.js`.
When the Apps Script source changes, paste `ops/google-sheet-submit.apps-script.gs` into Apps Script and deploy a new web app version.

## Deployment

This repository can be deployed with GitHub Pages, Vercel, Netlify, or any static hosting provider.
