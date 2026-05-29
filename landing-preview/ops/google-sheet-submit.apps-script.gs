const SHEET_ID = "187xPfNXluREBH7ytL4ope-qtO3uda5_ZuV3SI-mXXm0";
const SHEET_NAME = "시트";

const HEADERS = [
  "접수일시",
  "이름",
  "전화번호",
  "플레이스 URL",
  "플레이스 MID값",
  "수정된 플레이스 주소",
  "메인 키워드",
  "업종",
  "대행사/직광고주",
  "월 광고비 예산",
  "문의사항",
  "개인정보 수집·이용 동의",
  "제3자 정보 제공 동의",
  "페이지 URL",
  "사용자 환경",
];

function doPost(event) {
  try {
    const payload = JSON.parse((event.postData && event.postData.contents) || "{}");
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error(`Sheet tab not found: ${SHEET_NAME}`);
    }

    ensureHeader_(sheet);

    const leftValues = [
      new Date(),
      payload.name || "",
      payload.phone || "",
      payload.placeUrl || "",
    ];
    const rightValues = [
      payload.keyword || "",
      payload.businessType || "",
      payload.clientType || "",
      payload.budget || "",
      payload.message || "",
      payload.privacyConsent || "",
      payload.thirdPartyConsent || "",
      payload.pageUrl || "",
      payload.userAgent || "",
    ];

    const nextRow = findNextEmptyRow_(sheet);
    sheet.getRange(nextRow, 1, 1, leftValues.length).setValues([leftValues]);
    sheet.getRange(nextRow, 7, 1, rightValues.length).setValues([rightValues]);

    return jsonResponse({ ok: true, row: nextRow });
  } catch (error) {
    return jsonResponse({
      ok: false,
      message: error && error.message ? error.message : "Unknown error",
    });
  }
}

function doGet() {
  return jsonResponse({ ok: true, message: "Papa Company lead endpoint is running." });
}

function ensureHeader_(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
}

function findNextEmptyRow_(sheet) {
  const lastRow = Math.max(sheet.getLastRow(), 2);
  const timestamps = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const firstEmptyIndex = timestamps.findIndex(([value]) => value === "");

  if (firstEmptyIndex !== -1) {
    return firstEmptyIndex + 2;
  }

  return lastRow + 1;
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
