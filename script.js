const users = [
  { id: "papa.admin", password: "1234", name: "관리자", role: "admin" },
  { id: "이신", password: "ss1234", name: "이신", role: "staff" },
  { id: "정복", password: "5263", name: "정복", role: "staff" },
  { id: "지영", password: "5662", name: "지영", role: "staff" },
  { id: "용진", password: "9543", name: "용진", role: "staff" },
  { id: "정완", password: "9630", name: "정완", role: "staff" },
  { id: "현민", password: "4634", name: "현민", role: "staff" },
  { id: "오찬", password: "7468", name: "오찬", role: "staff" },
];

const materialStorageKey = "papainsight.salesMaterials.v1";

const materialCategories = [
  { id: "product-sheet", name: "파파 전체 상품 이미지표", hint: "첫 번째 대표 이미지표 영역입니다." },
  { id: "business-license", name: "사업자등록증", hint: "회사별 사업자등록증을 보관합니다." },
  { id: "place-reward", name: "플레이스 리워드", hint: "플레이스 리워드 영업자료를 등록합니다." },
  { id: "place-blog", name: "플레이스 블로그 배포", hint: "플레이스 블로그 배포 이미지표를 등록합니다." },
  { id: "place-receipt", name: "플레이스 영수증", hint: "플레이스 영수증 관련 자료를 등록합니다." },
  { id: "naver-shopping", name: "네이버 쇼핑 슬롯", hint: "네이버 쇼핑 슬롯 자료를 등록합니다." },
  { id: "coupang-slot", name: "쿠팡 슬롯", hint: "쿠팡 슬롯 자료를 등록합니다." },
  { id: "xiaohongshu", name: "샤오홍슈 체험단", hint: "샤오홍슈 체험단 자료를 등록합니다." },
  { id: "sns-reward", name: "SNS리워드", hint: "SNS 리워드 자료를 등록합니다." },
  { id: "carrot-market", name: "당근마켓", hint: "당근마켓 자료를 등록합니다." },
];

const defaultMaterials = [
  {
    id: "papa-company-license",
    categoryId: "business-license",
    title: "파파컴퍼니 사업자등록증",
    fileName: "papa-company-license.jpg",
    image: "assets/business-licenses/papa-company-license.jpg",
    source: "asset",
    createdAt: "2024-08-16",
  },
  {
    id: "mom-marketing-license",
    categoryId: "business-license",
    title: "맘마케팅 사업자등록증",
    fileName: "mom-marketing-license.png",
    image: "assets/business-licenses/mom-marketing-license.png",
    source: "asset",
    createdAt: "2023-07-16",
  },
];

const resources = [
  {
    category: "제안서",
    title: "신규 거래처 제안서 기본형",
    description: "첫 미팅 또는 카카오 상담 이후 전달하기 좋은 표준 제안 자료입니다.",
  },
  {
    category: "안내자료",
    title: "서비스 운영 프로세스 안내",
    description: "계약 이후 진행 단계와 담당자별 역할을 정리한 내부 공유 자료입니다.",
  },
  {
    category: "견적",
    title: "2026 견적 산정 기준표",
    description: "B2B, B2C 유형별 기본 견적 기준과 옵션 금액을 확인합니다.",
  },
];

const papaAiDocuments = [
  {
    id: "blog-executor-specs",
    title: "블로그 실행사 핵심 스펙",
    fileName: "블로그_실행사_핵심스펙_제한사항_환불_분할.md",
    path: "assets/papa-ai/blog-executor-specs.html",
    tablePath: "assets/papa-ai/blog-executor-specs.md",
    description: "블로그 배포, 실계정 기자단 배포 관련 실행사별 제한사항, 환불, 분할, CS Q&A",
  },
  {
    id: "product-specs",
    title: "상품별 핵심 스펙",
    fileName: "상품별_핵심스펙_제한사항_환불_효율_분할.md",
    path: "assets/papa-ai/product-specs.html",
    tablePath: "assets/papa-ai/product-specs.md",
    description: "실행사별 상품 핵심 스펙, 제한사항, 환불정책, 기본효율, 타수분할",
  },
];

const clients = [
  { name: "오렌지파트너스", type: "B2B", status: "진행 중", statusClass: "active", renewal: "2026-06-15", owner: "김팀장" },
  { name: "블루하우스", type: "B2C", status: "자료 대기", statusClass: "pending", renewal: "2026-06-02", owner: "이매니저" },
  { name: "그린커머스", type: "B2B", status: "완료", statusClass: "done", renewal: "2026-07-01", owner: "박대리" },
  { name: "스타트홈", type: "B2C", status: "연장 확인 필요", statusClass: "risk", renewal: "2026-05-30", owner: "최매니저" },
];

const loginView = document.querySelector("#loginView");
const dashboardView = document.querySelector("#dashboardView");
const loginForm = document.querySelector("#loginForm");
const logoutButton = document.querySelector("#logoutButton");
const currentUser = document.querySelector("#currentUser");
const pageTitle = document.querySelector("#pageTitle");
const salesPage = document.querySelector("#salesPage");
const papaAiPage = document.querySelector("#papaAiPage");
const clientsPage = document.querySelector("#clientsPage");
const navItems = document.querySelectorAll(".nav-item");
const materialsLibrary = document.querySelector("#materialsLibrary");
const materialModal = document.querySelector("#materialModal");
const materialForm = document.querySelector("#materialForm");
const materialCategory = document.querySelector("#materialCategory");
const materialTitle = document.querySelector("#materialTitle");
const materialFiles = document.querySelector("#materialFiles");
const openMaterialModalButton = document.querySelector("#openMaterialModal");
const closeMaterialModalButton = document.querySelector("#closeMaterialModal");
const cancelMaterialModalButton = document.querySelector("#cancelMaterialModal");
const toastMessage = document.querySelector("#toastMessage");
const aiDocList = document.querySelector("#aiDocList");
const aiDocTitle = document.querySelector("#aiDocTitle");
const aiDocContent = document.querySelector("#aiDocContent");
const aiDocSearch = document.querySelector("#aiDocSearch");

const papaAiDocumentCache = new Map();
let selectedPapaAiDocumentId = papaAiDocuments[0].id;

function getStoredMaterials() {
  try {
    const savedMaterials = JSON.parse(localStorage.getItem(materialStorageKey) || "[]");
    return Array.isArray(savedMaterials) ? savedMaterials : [];
  } catch (error) {
    console.warn("자료 저장소를 읽지 못했습니다.", error);
    return [];
  }
}

function saveStoredMaterials(materials) {
  localStorage.setItem(materialStorageKey, JSON.stringify(materials));
}

function getAllMaterials() {
  return [...defaultMaterials, ...getStoredMaterials()];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function markdownToHtml(markdown) {
  const normalizedLines = markdown.replace(/\r\n/g, "\n").split("\n");
  const htmlBlocks = [];

  for (let index = 0; index < normalizedLines.length; index += 1) {
    const line = normalizedLines[index];
    const nextLine = normalizedLines[index + 1] || "";

    if (isMarkdownTableStart(line, nextLine)) {
      const tableLines = [];

      while (index < normalizedLines.length && normalizedLines[index].trim().startsWith("|")) {
        tableLines.push(normalizedLines[index]);
        index += 1;
      }

      index -= 1;
      htmlBlocks.push(renderMarkdownTable(tableLines));
      continue;
    }

    htmlBlocks.push(escapeHtml(line));
  }

  return htmlBlocks
    .join("\n")
    .replace(/^### (.*)$/gm, "<h6>$1</h6>")
    .replace(/^## (.*)$/gm, "<h5>$1</h5>")
    .replace(/^# (.*)$/gm, "<h4>$1</h4>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
}

function isMarkdownTableStart(line, nextLine) {
  return line.trim().startsWith("|") && /^\s*\|?[\s:-]+\|[\s|:-]*$/.test(nextLine);
}

function splitMarkdownTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => escapeHtml(cell.trim()).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"));
}

function renderMarkdownTable(tableLines) {
  const headerCells = splitMarkdownTableRow(tableLines[0]);
  const bodyRows = tableLines.slice(2).map(splitMarkdownTableRow);

  return `
    <div class="ai-table-wrap">
      <table class="ai-markdown-table">
        <thead>
          <tr>${headerCells.map((cell) => `<th>${cell}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${bodyRows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function highlightSearch(html, searchTerm) {
  const term = searchTerm.trim();
  if (!term) return html;

  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return html.replace(new RegExp(escapedTerm, "gi"), (match) => `<mark>${match}</mark>`);
}

function showToast(message) {
  toastMessage.textContent = message;
  toastMessage.classList.remove("hidden");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toastMessage.classList.add("hidden"), 1800);
}

function renderCategoryOptions() {
  materialCategory.innerHTML = materialCategories
    .map((category) => `<option value="${category.id}">${category.name}</option>`)
    .join("");
}

function renderMaterials() {
  const allMaterials = getAllMaterials();

  materialsLibrary.innerHTML = materialCategories
    .map((category) => {
      const categoryMaterials = allMaterials.filter((material) => material.categoryId === category.id);
      const body = categoryMaterials.length
        ? `<div class="document-grid">${categoryMaterials.map(renderMaterialCard).join("")}</div>`
        : `<div class="empty-category">등록된 이미지가 없습니다.</div>`;

      return `
        <section class="resource-category">
          <div class="category-head">
            <div>
              <span class="category-label">카테고리</span>
              <h4>${category.name}</h4>
              <p>${category.hint}</p>
            </div>
            <strong>${categoryMaterials.length}개 자료</strong>
          </div>
          ${body}
        </section>
      `;
    })
    .join("");
}

function renderMaterialCard(material) {
  return `
    <article class="document-card">
      <a class="document-preview" href="${material.image}" target="_blank" rel="noreferrer">
        <img src="${material.image}" alt="${escapeHtml(material.title)}" loading="lazy" />
      </a>
      <div class="document-meta">
        <span class="tag">이미지 자료</span>
        <h5>${escapeHtml(material.title)}</h5>
        <p>${escapeHtml(material.fileName || "등록 이미지")}</p>
        <small>등록일: ${material.createdAt}</small>
        <div class="document-actions">
          <button class="mini-button" type="button" data-action="download-image" data-material-id="${material.id}">다운로드</button>
          <button class="mini-button" type="button" data-action="copy-image" data-material-id="${material.id}">복사</button>
          ${material.source === "local" ? `<button class="mini-button danger" type="button" data-action="delete-image" data-material-id="${material.id}">삭제</button>` : ""}
        </div>
      </div>
    </article>
  `;
}

function renderResources() {
  const legacyCategory = document.createElement("section");
  legacyCategory.className = "resource-category";
  legacyCategory.innerHTML = `
    <div class="category-head">
      <div>
        <span class="category-label">카테고리</span>
        <h4>기타 영업자료</h4>
        <p>문서형 자료를 모아둔 임시 영역입니다.</p>
      </div>
      <strong>${resources.length}개 자료</strong>
    </div>
    <div class="resource-grid">
      ${resources
        .map(
          (resource) => `
            <article class="resource-card">
              <span class="tag">${resource.category}</span>
              <h4>${resource.title}</h4>
              <p>${resource.description}</p>
              <button type="button">자료 보기</button>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
  materialsLibrary.appendChild(legacyCategory);
}

function renderSalesLibrary() {
  renderMaterials();
  renderResources();
}

function renderPapaAiDocumentList() {
  aiDocList.innerHTML = papaAiDocuments
    .map(
      (doc) => `
        <button class="ai-doc-button ${doc.id === selectedPapaAiDocumentId ? "active" : ""}" type="button" data-doc-id="${doc.id}">
          <strong>${doc.title}</strong>
          <span>${doc.fileName}</span>
          <small>${doc.description}</small>
        </button>
      `,
    )
    .join("");
}

async function loadPapaAiDocument(docId) {
  const doc = papaAiDocuments.find((item) => item.id === docId) || papaAiDocuments[0];
  selectedPapaAiDocumentId = doc.id;
  renderPapaAiDocumentList();
  aiDocTitle.textContent = doc.title;
  aiDocContent.textContent = "문서를 불러오는 중입니다.";

  try {
    if (!papaAiDocumentCache.has(doc.id)) {
      const [htmlResponse, tableResponse] = await Promise.all([fetch(doc.path), fetch(doc.tablePath)]);
      if (!htmlResponse.ok) throw new Error(`${htmlResponse.status} ${htmlResponse.statusText}`);
      if (!tableResponse.ok) throw new Error(`${tableResponse.status} ${tableResponse.statusText}`);

      const html = await htmlResponse.text();
      const tableSource = await tableResponse.text();
      papaAiDocumentCache.set(doc.id, {
        html,
        summaryTable: parseSummaryTable(tableSource),
      });
    }

    renderPapaAiDocumentContent();
  } catch (error) {
    aiDocContent.textContent = "문서를 불러오지 못했습니다.";
    console.error(error);
  }
}

function renderPapaAiDocumentContent() {
  const doc = papaAiDocuments.find((item) => item.id === selectedPapaAiDocumentId) || papaAiDocuments[0];
  const cachedDocument = papaAiDocumentCache.get(doc.id) || { html: "", summaryTable: null };
  const summaryHtml = renderSummaryTable(cachedDocument.summaryTable);
  const contentHtml = `
    ${summaryHtml}
    <div class="ai-doc-full">
      <div class="category-head ai-doc-section-head">
        <div>
          <span class="category-label">원문 문서</span>
          <h4>${doc.fileName}</h4>
          <p>아래 원문은 PAPAchatbot 문서 내용을 그대로 참고용으로 표시합니다.</p>
        </div>
      </div>
      ${cachedDocument.html}
    </div>
  `;
  aiDocContent.innerHTML = highlightSearch(contentHtml, aiDocSearch.value);
}

function parseSummaryTable(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const startIndex = lines.findIndex((line) => line.includes("핵심 비교 요약표"));
  if (startIndex === -1) return null;

  const tableLines = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) {
      if (tableLines.length > 1) break;
      continue;
    }

    if (!line.includes("\t")) {
      if (tableLines.length > 1) break;
      continue;
    }

    tableLines.push(line);
  }

  if (tableLines.length < 2) return null;

  const [headerLine, ...rowLines] = tableLines;
  return {
    headers: headerLine.split("\t").map((cell) => cell.trim()),
    rows: rowLines.map((line) => line.split("\t").map((cell) => cell.trim())),
  };
}

function renderSummaryTable(table) {
  if (!table) return "";

  return `
    <section class="ai-summary-section">
      <div class="category-head ai-doc-section-head">
        <div>
          <span class="category-label">핵심 비교 요약표</span>
          <h4>한눈에 보는 실행사/상품 비교</h4>
          <p>원본 문서의 핵심 비교 요약표를 표 형태로 먼저 정리했습니다.</p>
        </div>
      </div>
      <div class="ai-table-wrap">
        <table class="ai-summary-table">
          <thead>
            <tr>${table.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${table.rows
              .map(
                (row) => `
                  <tr>
                    ${table.headers.map((_, index) => `<td>${escapeHtml(row[index] || "")}</td>`).join("")}
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderClients() {
  const clientTable = document.querySelector("#clientTable");
  const renewalCount = clients.filter((client) => client.statusClass === "risk" || client.statusClass === "pending").length;

  document.querySelector("#totalClients").textContent = clients.length;
  document.querySelector("#activeClients").textContent = clients.filter((client) => client.statusClass === "active").length;
  document.querySelector("#renewalClients").textContent = renewalCount;

  clientTable.innerHTML = clients
    .map(
      (client) => `
        <tr>
          <td><strong>${client.name}</strong></td>
          <td>${client.type}</td>
          <td><span class="status ${client.statusClass}">${client.status}</span></td>
          <td>${client.renewal}</td>
          <td>${client.owner}</td>
        </tr>
      `,
    )
    .join("");
}

function openMaterialModal() {
  materialForm.reset();
  materialModal.classList.remove("hidden");
  materialTitle.focus();
}

function closeMaterialModal() {
  materialModal.classList.add("hidden");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

async function handleMaterialSubmit(event) {
  event.preventDefault();

  const files = Array.from(materialFiles.files || []);
  if (!files.length) {
    showToast("이미지 파일을 선택해 주세요.");
    return;
  }

  const categoryId = materialCategory.value;
  const title = materialTitle.value.trim();
  const createdAt = new Date().toISOString().slice(0, 10);
  const storedMaterials = getStoredMaterials();

  const uploadedMaterials = await Promise.all(
    files.map(async (file, index) => ({
      id: `local-${Date.now()}-${index}`,
      categoryId,
      title: files.length > 1 ? `${title} ${index + 1}` : title,
      fileName: file.name,
      image: await readFileAsDataUrl(file),
      source: "local",
      createdAt,
    })),
  );

  saveStoredMaterials([...storedMaterials, ...uploadedMaterials]);
  renderSalesLibrary();
  closeMaterialModal();
  showToast("자료가 등록되었습니다.");
}

async function getMaterialBlob(material) {
  const response = await fetch(material.image);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.blob();
}

function getMaterialFileName(material, blob) {
  if (material.fileName) return material.fileName;

  const extension = blob.type.split("/")[1] || "png";
  return `${material.title}.${extension}`;
}

async function downloadMaterialImage(material) {
  try {
    const blob = await getMaterialBlob(material);
    const objectUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");

    downloadLink.href = objectUrl;
    downloadLink.download = getMaterialFileName(material, blob);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(objectUrl);
    showToast("이미지 다운로드를 시작했습니다.");
  } catch (error) {
    console.error("이미지 다운로드 실패", error);
    showToast("이미지를 다운로드하지 못했습니다.");
  }
}

async function copyMaterialImage(material) {
  try {
    const blob = await getMaterialBlob(material);

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      showToast("이미지를 클립보드에 복사했습니다.");
      return;
    }
  } catch (error) {
    console.warn("이미지 복사 실패", error);
  }

  const didCopyUrl = await copyTextToClipboard(new URL(material.image, window.location.href).href);
  showToast(didCopyUrl ? "이미지 주소를 복사했습니다." : "이 브라우저에서는 이미지 복사가 제한됩니다.");
}

async function copyTextToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.warn("Clipboard API 텍스트 복사 실패", error);
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  } catch (error) {
    console.warn("Fallback 텍스트 복사 실패", error);
    return false;
  }
}

function deleteStoredMaterial(materialId) {
  const nextMaterials = getStoredMaterials().filter((material) => material.id !== materialId);
  saveStoredMaterials(nextMaterials);
  renderSalesLibrary();
  showToast("자료가 삭제되었습니다.");
}

function handleMaterialClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const materialId = button.dataset.materialId;
  const material = getAllMaterials().find((item) => item.id === materialId);
  if (!material) return;

  if (button.dataset.action === "copy-image") {
    copyMaterialImage(material);
  }

  if (button.dataset.action === "download-image") {
    downloadMaterialImage(material);
  }

  if (button.dataset.action === "delete-image") {
    deleteStoredMaterial(material.id);
  }
}

function showDashboard(user) {
  currentUser.textContent = `${user.name} (${user.id})`;
  loginView.classList.add("hidden");
  dashboardView.classList.remove("hidden");
}

function showPage(page) {
  const pageTitles = {
    sales: "영업자료",
    "papa-ai": "파파AI",
    clients: "거래처 관리",
  };

  pageTitle.textContent = pageTitles[page] || pageTitles.sales;
  salesPage.classList.toggle("hidden", page !== "sales");
  papaAiPage.classList.toggle("hidden", page !== "papa-ai");
  clientsPage.classList.toggle("hidden", page !== "clients");

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.page === page);
  });

  if (page === "papa-ai" && !papaAiDocumentCache.has(selectedPapaAiDocumentId)) {
    loadPapaAiDocument(selectedPapaAiDocumentId);
  }
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const userId = formData.get("userId")?.trim();
  const password = formData.get("password")?.trim();
  const user = users.find((item) => item.id === userId && item.password === password);

  if (!user) {
    alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    return;
  }

  showDashboard(user);
});

logoutButton.addEventListener("click", () => {
  loginForm.reset();
  dashboardView.classList.add("hidden");
  loginView.classList.remove("hidden");
  showPage("sales");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => showPage(item.dataset.page));
});

openMaterialModalButton.addEventListener("click", openMaterialModal);
closeMaterialModalButton.addEventListener("click", closeMaterialModal);
cancelMaterialModalButton.addEventListener("click", closeMaterialModal);
materialModal.addEventListener("click", (event) => {
  if (event.target === materialModal) closeMaterialModal();
});
materialForm.addEventListener("submit", handleMaterialSubmit);
materialsLibrary.addEventListener("click", handleMaterialClick);
aiDocList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-doc-id]");
  if (button) loadPapaAiDocument(button.dataset.docId);
});
aiDocSearch.addEventListener("input", renderPapaAiDocumentContent);

renderCategoryOptions();
renderSalesLibrary();
renderPapaAiDocumentList();
renderClients();
