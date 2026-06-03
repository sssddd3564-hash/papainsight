const users = [
  { id: "papa.admin", password: "1234", name: "관리자", role: "admin" },
  { id: "이신", password: "ss1234", passwordAliases: ["ㄴㄴ1234"], name: "이신", role: "staff" },
  { id: "정복", password: "5263", name: "정복", role: "staff" },
  { id: "지영", password: "5662", name: "지영", role: "staff" },
  { id: "용진", password: "9543", name: "용진", role: "staff" },
  { id: "정완", password: "9630", name: "정완", role: "staff" },
  { id: "현민", password: "4634", name: "현민", role: "staff" },
  { id: "오찬", password: "7468", name: "오찬", role: "staff" },
];

const appVersion = "0.1";
const materialStorageKey = "papainsight.salesMaterials.v2";
const deletedMaterialStorageKey = "papainsight.deletedMaterials.v1";
const deletedAssetStorageKey = "papainsight.deletedAssetIds.v1";
const inboundContactStorageKey = "papainsight.inboundContacts.v1";
const materialApiEndpoint = "/api/materials";

const materialCategories = [
  { id: "business-license", name: "사업자등록증", hint: "회사별 사업자등록증을 보관합니다." },
  { id: "product-sheet", name: "파파 전체 상품 이미지표", hint: "첫 번째 대표 이미지표 영역입니다." },
  { id: "place-reward", name: "플레이스 리워드", hint: "플레이스 리워드 영업자료를 등록합니다." },
  { id: "place-blog", name: "플레이스 블로그 배포", hint: "플레이스 블로그 배포 이미지표를 등록합니다." },
  { id: "place-receipt", name: "플레이스 영수증", hint: "플레이스 영수증 관련 자료를 등록합니다." },
  { id: "clip-top-rank", name: "클립 상위노출", hint: "클립 상위노출 관련 단가, 설명, 레퍼런스 자료를 등록합니다." },
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
    createdBy: "기본 등록",
  },
  {
    id: "mom-marketing-license",
    categoryId: "business-license",
    title: "맘마케팅 사업자등록증",
    fileName: "mom-marketing-license.png",
    image: "assets/business-licenses/mom-marketing-license.png",
    source: "asset",
    createdAt: "2023-07-16",
    createdBy: "기본 등록",
  },
];

const papaAiDocuments = [
  {
    id: "blog-executor-specs",
    title: "블로그 실행사 핵심 스펙",
    fileName: "블로그_실행사_핵심스펙_제한사항_환불_분할.md",
    path: "assets/papa-ai/blog-executor-specs.html",
    tablePath: "assets/papa-ai/blog-executor-specs.md",
    description: "블로그 배포, 실제정 기자단 배포 관련 제한사항, 환불, 분할, CS Q&A",
  },
  {
    id: "product-specs",
    title: "상품별 핵심 스펙",
    fileName: "상품별_핵심스펙_제한사항_환불_효율_분할.md",
    path: "assets/papa-ai/product-specs.html",
    tablePath: "assets/papa-ai/product-specs.md",
    description: "실행사별 상품 핵심 스펙, 제한사항, 환불정책, 기본 효율, 타수분할",
  },
];

const clientOwners = ["이신", "정완", "현민", "오찬", "도영"];
const clientStatusGroups = ["거래중", "상담중", "대기"];
const clients = [
  { id: 1, name: "청라뷰티랩", type: "B2C", status: "거래중", owner: "이신", memo: "플레이스 리워드 진행" },
  { id: 2, name: "브라운하우스", type: "B2C", status: "상담중", owner: "이신", memo: "블로그 배포 견적 확인" },
  { id: 3, name: "더라인컴퍼니", type: "B2B", status: "거래중", owner: "정완", memo: "월 단위 슬롯 운영" },
  { id: 4, name: "그린커머스", type: "B2B", status: "대기", owner: "정완", memo: "계약서 회신 대기" },
  { id: 5, name: "루미에르살롱", type: "B2C", status: "거래중", owner: "현민", memo: "영수증 리뷰 관리" },
  { id: 6, name: "마켓온", type: "B2B", status: "상담중", owner: "현민", memo: "쿠팡 슬롯 문의" },
  { id: 7, name: "오찬담당 샘플몰", type: "B2C", status: "대기", owner: "오찬", memo: "자료 전달 필요" },
  { id: 8, name: "도영파트너스", type: "B2B", status: "거래중", owner: "도영", memo: "플레이스 블로그 배포" },
];

const inboundLeads = [
  {
    id: "lead-20260528-1640",
    receivedAt: "2026-05-28 16:40",
    name: "김민서",
    phone: "010-4821-9374",
    placeUrl: "https://m.place.naver.com/place/1234567890",
    mainKeyword: "인천 피부관리",
    industry: "뷰티/에스테틱",
    advertiserType: "직광고주",
    monthlyBudget: "300만원",
    inquiry: "플레이스 순위와 블로그 배포를 함께 문의",
  },
  {
    id: "lead-20260528-1525",
    receivedAt: "2026-05-28 15:25",
    name: "박준호",
    phone: "010-7392-1846",
    placeUrl: "https://m.place.naver.com/place/2345678901",
    mainKeyword: "청라 맛집",
    industry: "음식점",
    advertiserType: "직광고주",
    monthlyBudget: "150만원",
    inquiry: "플레이스 리워드 가능 여부 확인 요청",
  },
  {
    id: "lead-20260528-1310",
    receivedAt: "2026-05-28 13:10",
    name: "이하늘",
    phone: "010-2618-5409",
    placeUrl: "https://m.place.naver.com/place/3456789012",
    mainKeyword: "송도 치과",
    industry: "병원/의료",
    advertiserType: "대행사",
    monthlyBudget: "500만원",
    inquiry: "여러 지점 견적과 운영 방식 문의",
  },
  {
    id: "lead-20260527-1805",
    receivedAt: "2026-05-27 18:05",
    name: "최유진",
    phone: "010-5840-6712",
    placeUrl: "https://m.place.naver.com/place/4567890123",
    mainKeyword: "부평 PT",
    industry: "피트니스",
    advertiserType: "직광고주",
    monthlyBudget: "200만원",
    inquiry: "블로그 배포와 영수증 리뷰 병행 가능 여부",
  },
];

const iconPaths = {
  "panel-left-close": '<rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M9 4v16"></path><path d="m16 10-2 2 2 2"></path>',
  "panel-left-open": '<rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M9 4v16"></path><path d="m14 10 2 2-2 2"></path>',
};

const loginView = document.querySelector("#loginView");
const dashboardView = document.querySelector("#dashboardView");
const loginForm = document.querySelector("#loginForm");
const logoutButton = document.querySelector("#logoutButton");
const currentUser = document.querySelector("#currentUser");
const pageTitle = document.querySelector("#pageTitle");
const sidebar = document.querySelector("#sidebar");
const sidebarToggle = document.querySelector("#sidebarToggle");
const inboundPage = document.querySelector("#inboundPage");
const salesPage = document.querySelector("#salesPage");
const textSalesPage = document.querySelector("#textSalesPage");
const clientsPage = document.querySelector("#clientsPage");
const settlementPage = document.querySelector("#settlementPage");
const navItems = document.querySelectorAll(".nav-item");
const clientSubnav = document.querySelector("#clientSubnav");
const clientOwnerTabs = document.querySelector("#clientOwnerTabs");
const materialsLibrary = document.querySelector("#materialsLibrary");
const materialModal = document.querySelector("#materialModal");
const materialForm = document.querySelector("#materialForm");
const materialCategory = document.querySelector("#materialCategory");
const materialTitle = document.querySelector("#materialTitle");
const materialFiles = document.querySelector("#materialFiles");
const materialFilesLabel = document.querySelector("#materialFilesLabel");
const materialLink = document.querySelector("#materialLink");
const materialLinkLabel = document.querySelector("#materialLinkLabel");
const editMaterialNote = document.querySelector("#editMaterialNote");
const openMaterialModalButton = document.querySelector("#openMaterialModal");
const openReferenceMaterialModalButton = document.querySelector("#openReferenceMaterialModal");
const openReferenceLinkModalButton = document.querySelector("#openReferenceLinkModal");
const closeMaterialModalButton = document.querySelector("#closeMaterialModal");
const cancelMaterialModalButton = document.querySelector("#cancelMaterialModal");
const openTrashLogButton = document.querySelector("#openTrashLog");
const trashModal = document.querySelector("#trashModal");
const closeTrashModalButton = document.querySelector("#closeTrashModal");
const trashLogList = document.querySelector("#trashLogList");
const toastMessage = document.querySelector("#toastMessage");
const aiDocList = document.querySelector("#aiDocList");
const aiDocTitle = document.querySelector("#aiDocTitle");
const aiDocContent = document.querySelector("#aiDocContent");
const aiDocSearch = document.querySelector("#aiDocSearch");
const inboundTableBody = document.querySelector("#inboundTableBody");

const papaAiDocumentCache = new Map();
let selectedPapaAiDocumentId = papaAiDocuments[0].id;
let selectedClientOwner = clientOwners[0];
let currentUserData = users[0];
let currentPage = "inbound";
let clientSubnavExpanded = false;
let currentMaterialKind = "pricing";
let activeMaterialVault = "pricing";
let editingMaterialId = null;
let materialSearchTerm = "";
let materialSearchComposing = false;
let materialSearchTimer = null;
const expandedMaterialIds = new Set();
const selectedMaterialIds = new Set();
const openCategoryIds = new Set();
const materialState = {
  serverAvailable: false,
  materials: null,
  deletedAssetIds: null,
  deleteLogs: null,
};

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch (error) {
    console.warn("저장 데이터를 읽지 못했습니다.", key, error);
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("로컬 백업 저장을 건너뜁니다.", key, error);
  }
}

function getStoredMaterials() {
  const materials = materialState.materials ?? readJson(materialStorageKey, []);
  return Array.isArray(materials) ? materials : [];
}

function saveStoredMaterials(materials) {
  materialState.materials = materials;
  writeJson(materialStorageKey, materials);
}

function getDeletedAssetIds() {
  const ids = materialState.deletedAssetIds ?? readJson(deletedAssetStorageKey, []);
  return Array.isArray(ids) ? ids : [];
}

function saveDeletedAssetIds(ids) {
  materialState.deletedAssetIds = ids;
  writeJson(deletedAssetStorageKey, ids);
}

function getDeleteLogs() {
  const logs = materialState.deleteLogs ?? readJson(deletedMaterialStorageKey, []);
  return Array.isArray(logs) ? logs : [];
}

function saveDeleteLogs(logs) {
  materialState.deleteLogs = logs;
  writeJson(deletedMaterialStorageKey, logs);
}

function getMaterialStatePayload() {
  return {
    materials: getStoredMaterials(),
    deletedAssetIds: getDeletedAssetIds(),
    deleteLogs: getDeleteLogs(),
  };
}

function applyMaterialState(payload) {
  const nextMaterials = Array.isArray(payload.materials) ? payload.materials : [];
  const nextDeletedAssetIds = Array.isArray(payload.deletedAssetIds) ? payload.deletedAssetIds : [];
  const nextDeleteLogs = Array.isArray(payload.deleteLogs) ? payload.deleteLogs : [];

  saveStoredMaterials(nextMaterials);
  saveDeletedAssetIds(nextDeletedAssetIds);
  saveDeleteLogs(nextDeleteLogs);
}

async function loadSharedMaterialState() {
  try {
    const response = await fetch(materialApiEndpoint, { cache: "no-store" });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const payload = await response.json();
    materialState.serverAvailable = true;
    applyMaterialState(payload);
  } catch (error) {
    materialState.serverAvailable = false;
    console.warn("공유 자료 저장소를 불러오지 못해 로컬 저장소로 동작합니다.", error);
  }
}

async function persistSharedMaterialState() {
  if (!materialState.serverAvailable) return;

  const response = await fetch(materialApiEndpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(getMaterialStatePayload()),
  });

  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const payload = await response.json();
  applyMaterialState(payload);
}

function getInboundContacts() {
  const contacts = readJson(inboundContactStorageKey, {});
  return contacts && typeof contacts === "object" && !Array.isArray(contacts) ? contacts : {};
}

function saveInboundContacts(contacts) {
  writeJson(inboundContactStorageKey, contacts);
}

function formatDateKey(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isTodayInboundLead(lead) {
  return lead.receivedAt.slice(0, 10) === formatDateKey();
}

function getAllMaterials() {
  const deletedAssetIds = new Set(getDeletedAssetIds());
  const storedMaterials = getStoredMaterials();
  const storedById = new Map(storedMaterials.map((material) => [material.id, material]));
  const baseMaterials = defaultMaterials
    .filter((material) => !deletedAssetIds.has(material.id))
    .map((material) => storedById.get(material.id) || material);
  const customMaterials = storedMaterials.filter((material) => !defaultMaterials.some((defaultMaterial) => defaultMaterial.id === material.id));
  return [...baseMaterials, ...customMaterials];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || ""}</svg>`;
}

function formatDateTime(value = new Date()) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
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

const materialVaults = [
  {
    kind: "pricing",
    title: "단가 및 설명 이미지",
    subtitle: "상품 단가표와 설명 이미지를 카테고리별로 정리합니다.",
    className: "pricing-vault-section",
  },
  {
    kind: "reference-image",
    title: "레퍼런스 이미지",
    subtitle: "상품별 참고 이미지와 사례 이미지를 모아봅니다.",
    className: "reference-image-vault-section",
  },
  {
    kind: "reference-link",
    title: "레퍼런스 링크",
    subtitle: "여러 레퍼런스 링크를 묶음 카드로 모아봅니다.",
    className: "reference-link-vault-section",
  },
];

function getMaterialKind(material) {
  if (material.kind === "reference") {
    return material.image ? "reference-image" : "reference-link";
  }
  return material.kind || "pricing";
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "");
}

function renderMaterials() {
  const allMaterials = getAllMaterials();
  const vault = materialVaults.find((item) => item.kind === activeMaterialVault) || materialVaults[0];
  const activeMaterials = allMaterials.filter((material) => getMaterialKind(material) === vault.kind);

  document.querySelectorAll("[data-vault-kind]").forEach((card) => {
    card.classList.toggle("active", card.dataset.vaultKind === vault.kind);
  });

  materialsLibrary.innerHTML = renderMaterialVault(vault, activeMaterials);
}

function renderMaterialVault(vault, materials) {
  const totalCount = materials.length;
  const selectedCount = materials.filter((material) => selectedMaterialIds.has(material.id)).length;
  const normalizedSearch = normalizeSearchText(materialSearchTerm);
  const filteredCategories = normalizedSearch
    ? materialCategories.filter((category) => normalizeSearchText(`${category.name} ${category.hint}`).includes(normalizedSearch))
    : materialCategories;
  const categoryMarkup = materialCategories
    .filter((category) => filteredCategories.includes(category))
    .map((category, index) => {
      const categoryMaterials = materials.filter((material) => material.categoryId === category.id);
      const categoryKey = `${vault.kind}:${category.id}`;
      const isOpen = categoryMaterials.length > 0 && (openCategoryIds.has(categoryKey) || index < 3);
      const selectedCategoryCount = categoryMaterials.filter((material) => selectedMaterialIds.has(material.id)).length;
      const body = categoryMaterials.length
        ? `
          <div class="category-body ${isOpen ? "" : "collapsed"}">
            <div class="document-grid">${categoryMaterials.map(renderMaterialCard).join("")}</div>
          </div>
        `
        : "";

      return `
        <section class="resource-category ${categoryMaterials.length ? "has-materials" : "is-empty"}" data-category-id="${category.id}">
          <div class="category-head" role="button" tabindex="0" data-action="toggle-category" aria-expanded="${isOpen ? "true" : "false"}">
            <div>
              <span class="category-label">카테고리</span>
              <h4>${category.name}</h4>
              <p>${category.hint}</p>
            </div>
            <div class="category-actions">
              <span class="category-count-card">
                <strong>${categoryMaterials.length}</strong>
                <small>자료</small>
              </span>
              <button class="mini-button category-select-button" type="button" data-action="select-category-materials" data-category-id="${category.id}">
                ${selectedCategoryCount === categoryMaterials.length && categoryMaterials.length ? "선택 해제" : "전체 선택"}
              </button>
            </div>
          </div>
          ${body}
        </section>
      `;
    })
    .join("");

  return `
    <section class="material-vault-section ${vault.className}">
      <div class="vault-section-head">
        <div>
          <span class="category-label">보관함</span>
          <h4>${vault.title}</h4>
          <p>${vault.subtitle}</p>
        </div>
        <div class="bulk-actions">
          <label class="material-search">
            <span>카테고리 검색</span>
            <input id="materialCategorySearch" type="search" value="${escapeHtml(materialSearchTerm)}" list="materialCategorySuggestions" placeholder="예: 클립, 플레이스" autocomplete="off" />
            <datalist id="materialCategorySuggestions">
              ${materialCategories.map((category) => `<option value="${escapeHtml(category.name)}"></option>`).join("")}
            </datalist>
          </label>
          <strong>${totalCount}개</strong>
          <button class="mini-button" type="button" data-action="select-visible-materials">${selectedCount === totalCount && totalCount ? "전체 해제" : "전체 선택"}</button>
          <button class="mini-button" type="button" data-action="download-selected-materials" ${selectedCount ? "" : "disabled"}>선택 다운로드</button>
          <button class="mini-button" type="button" data-action="copy-selected-materials" ${selectedCount ? "" : "disabled"}>선택 복사</button>
        </div>
      </div>
      <div class="vault-category-list">${categoryMarkup}</div>
    </section>
  `;
}

function renderMaterialCard(material) {
  const createdBy = material.createdBy || "기본 등록";
  const updatedBy = material.updatedBy ? `<small>수정자: ${escapeHtml(material.updatedBy)}</small>` : "";
  const isExpanded = expandedMaterialIds.has(material.id) || material.expanded;
  const isSelected = selectedMaterialIds.has(material.id);
  const links = Array.isArray(material.links) ? material.links : material.linkUrl ? [material.linkUrl] : [];
  const isLinkGroup = getMaterialKind(material) === "reference-link";
  const isLinkOnly = !material.image && links.length;
  const href = material.image || links[0] || "#";
  const preview = material.image
    ? `<img src="${material.image}" alt="${escapeHtml(material.title)}" loading="lazy" />`
    : `<div class="link-preview"><span>↗</span><strong>링크 묶음</strong><small>${links.length}개 링크</small></div>`;
  const fileLabel = material.fileName || (links.length ? `${links.length}개 링크` : "등록 자료");
  const actionButtons = isLinkOnly
    ? `
          ${links.length === 1 ? `<a class="mini-button" href="${escapeHtml(links[0])}" target="_blank" rel="noreferrer">링크 열기</a>` : ""}
          <button class="mini-button" type="button" data-action="copy-link" data-material-id="${material.id}">링크 복사</button>
      `
    : `
          <button class="mini-button" type="button" data-action="toggle-image" data-material-id="${material.id}">${isExpanded ? "접기" : "펼쳐보기"}</button>
          <button class="mini-button" type="button" data-action="download-image" data-material-id="${material.id}">다운로드</button>
          <button class="mini-button" type="button" data-action="copy-image" data-material-id="${material.id}">복사</button>
          ${material.linkUrl ? `<a class="mini-button" href="${escapeHtml(material.linkUrl)}" target="_blank" rel="noreferrer">링크 열기</a>` : ""}
      `;
  return `
    <article class="document-card ${isExpanded ? "expanded" : ""} ${isSelected ? "selected" : ""}" data-material-id="${material.id}">
      <label class="material-check" title="자료 선택">
        <input type="checkbox" data-action="select-material" data-material-id="${material.id}" ${isSelected ? "checked" : ""} />
        <span></span>
      </label>
      <a class="document-preview" href="${escapeHtml(href)}" target="_blank" rel="noreferrer">
        ${preview}
      </a>
      <div class="document-meta">
        <span class="tag">${isLinkOnly ? "링크 자료" : "이미지 자료"}</span>
        <h5 title="${escapeHtml(material.title)}">${escapeHtml(material.title)}</h5>
        <p title="${escapeHtml(fileLabel)}">${escapeHtml(fileLabel)}</p>
        ${isLinkGroup ? `<div class="link-list">${links.map((link) => `<a href="${escapeHtml(link)}" target="_blank" rel="noreferrer">${escapeHtml(link)}</a>`).join("")}</div>` : ""}
        <small>등록일: ${escapeHtml(material.createdAt)}</small>
        <small>등록자: ${escapeHtml(createdBy)}</small>
        ${updatedBy}
        <div class="document-actions">
          ${actionButtons}
          <button class="mini-button" type="button" data-action="edit-image" data-material-id="${material.id}">수정</button>
          <button class="mini-button danger" type="button" data-action="delete-image" data-material-id="${material.id}">삭제</button>
        </div>
      </div>
    </article>
  `;
}

function renderSalesLibrary() {
  renderMaterials();
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
  const contentHtml = `
    ${renderSummaryTable(cachedDocument.summaryTable)}
    <div class="ai-doc-full">
      <div class="category-head static-head">
        <div>
          <span class="category-label">원문 문서</span>
          <h4>${escapeHtml(doc.fileName)}</h4>
          <p>원문 내용은 참고용으로 하단에 그대로 표시합니다.</p>
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
      <div class="category-head static-head">
        <div>
          <span class="category-label">핵심 비교 요약표</span>
          <h4>한눈에 보는 실행사/상품 비교</h4>
          <p>원문 문서의 비교 요약표를 표 형태로 먼저 정리했습니다.</p>
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

function highlightSearch(html, searchTerm) {
  const term = searchTerm.trim();
  if (!term) return html;

  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return html.replace(new RegExp(escapedTerm, "gi"), (match) => `<mark>${match}</mark>`);
}

function renderClientNavigation() {
  clientSubnav.innerHTML = clientOwners
    .map(
      (owner) => `
        <button class="subnav-item ${owner === selectedClientOwner ? "active" : ""}" type="button" data-owner="${owner}">
          <span>${owner}</span>
        </button>
      `,
    )
    .join("");

  clientOwnerTabs.innerHTML = clientOwners
    .map(
      (owner) => `
        <button class="owner-tab ${owner === selectedClientOwner ? "active" : ""}" type="button" data-owner="${owner}">
          ${owner}
        </button>
      `,
    )
    .join("");
}

function renderClients() {
  const ownerClients = clients.filter((client) => client.owner === selectedClientOwner);
  const b2cClients = ownerClients.filter((client) => client.type === "B2C");
  const b2bClients = ownerClients.filter((client) => client.type === "B2B");

  document.querySelector("#totalClients").textContent = ownerClients.length;
  document.querySelector("#activeClients").textContent = ownerClients.filter((client) => client.status === "거래중").length;
  document.querySelector("#pendingClients").textContent = ownerClients.filter((client) => client.status !== "거래중").length;
  document.querySelector("#b2cCount").textContent = b2cClients.length;
  document.querySelector("#b2bCount").textContent = b2bClients.length;
  document.querySelector("#b2cClients").innerHTML = renderClientTypeBoard(b2cClients);
  document.querySelector("#b2bClients").innerHTML = renderClientTypeBoard(b2bClients);
  renderClientNavigation();
}

function renderClientTypeBoard(typeClients) {
  return clientStatusGroups
    .map((status) => {
      const statusClients = typeClients.filter((client) => client.status === status);
      return `
        <section class="status-column">
          <div class="status-column-head">
            <span>${status}</span>
            <strong>${statusClients.length}</strong>
          </div>
          <div class="status-card-list">
            ${
              statusClients.length
                ? statusClients.map(renderClientCard).join("")
                : `<div class="empty-client">등록된 거래처가 없습니다.</div>`
            }
          </div>
        </section>
      `;
    })
    .join("");
}

function renderClientCard(client) {
  return `
    <article class="client-card">
      <span class="status ${getStatusClass(client.status)}">${client.status}</span>
      <h4>${escapeHtml(client.name)}</h4>
      <p>${escapeHtml(client.memo)}</p>
      <small>담당자: ${escapeHtml(client.owner)}</small>
    </article>
  `;
}

function renderInboundLeads() {
  const sortedLeads = [...inboundLeads].sort((a, b) => new Date(b.receivedAt.replace(" ", "T")) - new Date(a.receivedAt.replace(" ", "T")));
  const contactLogs = getInboundContacts();

  inboundTableBody.innerHTML = sortedLeads
    .map((lead) => {
      const contact = contactLogs[lead.id];
      const isToday = isTodayInboundLead(lead);

      return `
        <tr class="${isToday ? "is-today-lead" : ""} ${contact ? "is-contacted-lead" : ""}">
          <td>
            <strong>${escapeHtml(lead.receivedAt)}</strong>
            ${isToday ? '<span class="fresh-badge">오늘 유입</span>' : ""}
          </td>
          <td>${escapeHtml(lead.name)}</td>
          <td>${escapeHtml(lead.phone)}</td>
          <td><a href="${escapeHtml(lead.placeUrl)}" target="_blank" rel="noreferrer">플레이스 보기</a></td>
          <td>${escapeHtml(lead.mainKeyword)}</td>
          <td>${escapeHtml(lead.industry)}</td>
          <td><span class="status ${lead.advertiserType === "직광고주" ? "active" : "pending"}">${escapeHtml(lead.advertiserType)}</span></td>
          <td>${escapeHtml(lead.monthlyBudget)}</td>
          <td>${escapeHtml(lead.inquiry)}</td>
          <td>
            <button class="contact-check ${contact ? "checked" : ""}" type="button" data-lead-id="${escapeHtml(lead.id)}">
              ${contact ? "체크 완료" : "연락 체크"}
            </button>
            ${
              contact
                ? `<small class="contact-meta">${escapeHtml(contact.userName)} (${escapeHtml(contact.userId)})<br />${escapeHtml(contact.checkedAt)}</small>`
                : '<small class="contact-meta muted">미연락</small>'
            }
          </td>
        </tr>
      `;
    })
    .join("");
}

function toggleInboundContact(leadId) {
  const contacts = getInboundContacts();

  if (contacts[leadId]) {
    delete contacts[leadId];
    saveInboundContacts(contacts);
    renderInboundLeads();
    showToast("연락 체크를 해제했습니다.");
    return;
  }

  contacts[leadId] = {
    userId: currentUserData.id,
    userName: currentUserData.name,
    checkedAt: formatDateTime(),
  };
  saveInboundContacts(contacts);
  renderInboundLeads();
  showToast(`${currentUserData.name} 계정으로 연락 체크했습니다.`);
}

function getStatusClass(status) {
  if (status === "거래중") return "active";
  if (status === "상담중") return "pending";
  return "risk";
}

function updateMaterialModalMode() {
  const isReferenceImage = currentMaterialKind === "reference-image";
  const isReferenceLink = currentMaterialKind === "reference-link";

  materialModal.classList.toggle("reference-mode", isReferenceImage || isReferenceLink);
  materialModal.classList.toggle("reference-link-mode", isReferenceLink);
  const modeLabel = editingMaterialId ? "수정" : "추가";
  const titleMap = {
    pricing: `단가 및 설명 자료 ${modeLabel}`,
    "reference-image": `레퍼런스 이미지 ${modeLabel}`,
    "reference-link": `레퍼런스 링크 ${modeLabel}`,
  };
  document.querySelector("#materialModalTitle").textContent = titleMap[currentMaterialKind] || titleMap.pricing;
  materialFiles.required = !isReferenceLink && !editingMaterialId;
  materialFilesLabel.classList.toggle("hidden", isReferenceLink);
  materialLink.required = isReferenceLink && !editingMaterialId;
  materialLinkLabel.classList.toggle("hidden", !isReferenceLink);
  editMaterialNote.classList.toggle("hidden", !editingMaterialId);
}

function openMaterialModal(kind = "pricing") {
  editingMaterialId = null;
  currentMaterialKind = kind;
  activeMaterialVault = kind;
  renderSalesLibrary();
  materialForm.reset();
  updateMaterialModalMode();
  materialModal.classList.remove("hidden");
  materialTitle.focus();
}

function openEditMaterialModal(materialId) {
  const material = getAllMaterials().find((item) => item.id === materialId);
  if (!material) return;

  editingMaterialId = material.id;
  currentMaterialKind = getMaterialKind(material);
  activeMaterialVault = currentMaterialKind;
  renderSalesLibrary();
  materialForm.reset();
  materialCategory.value = material.categoryId;
  materialTitle.value = material.title;
  materialLink.value = Array.isArray(material.links) ? material.links.join("\n") : material.linkUrl || "";
  updateMaterialModalMode();
  materialModal.classList.remove("hidden");
  materialTitle.focus();
}

function selectMaterialVault(kind) {
  activeMaterialVault = kind;
  renderSalesLibrary();
}

function closeMaterialModal() {
  editingMaterialId = null;
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

function parseReferenceLinks(value) {
  return value
    .split(/\r?\n|,\s*/)
    .map((link) => link.trim())
    .filter(Boolean);
}

async function handleMaterialSubmit(event) {
  event.preventDefault();
  const submitButton = materialForm.querySelector("button[type='submit']");

  const files = Array.from(materialFiles.files || []);
  const linkLines = parseReferenceLinks(materialLink.value);
  const linkUrl = linkLines[0] || "";
  const isReferenceLink = currentMaterialKind === "reference-link";

  if (!files.length && !isReferenceLink && !editingMaterialId) {
    showToast("이미지 파일을 선택해 주세요.");
    return;
  }

  if (isReferenceLink && !linkLines.length && !editingMaterialId) {
    showToast("레퍼런스 링크를 입력해 주세요.");
    return;
  }

  const categoryId = materialCategory.value;
  const title = materialTitle.value.trim();
  const createdAt = formatDateTime();
  const createdBy = `${currentUserData.name} (${currentUserData.id})`;
  const isEditing = Boolean(editingMaterialId);
  try {
    if (submitButton) submitButton.disabled = true;

    const uploadBatchId = Date.now();
    const storedMaterials = getStoredMaterials();
    let nextMaterials = [];

    if (editingMaterialId) {
      const currentMaterial = getAllMaterials().find((material) => material.id === editingMaterialId);
      const replacementFile = files[0];
      const editedMaterial = {
        ...currentMaterial,
        id: editingMaterialId,
        kind: currentMaterialKind,
        categoryId,
        title,
        fileName: replacementFile ? replacementFile.name : currentMaterial.fileName,
        image: isReferenceLink ? "" : replacementFile ? await readFileAsDataUrl(replacementFile) : currentMaterial.image,
        linkUrl,
        links: isReferenceLink ? linkLines : undefined,
        source: "local",
        updatedAt: formatDateTime(),
        updatedBy: createdBy,
      };
      nextMaterials = [...storedMaterials.filter((material) => material.id !== editingMaterialId), editedMaterial];
    } else {
      const uploadedMaterials = await Promise.all(
        files.map(async (file, index) => ({
          id: `local-${uploadBatchId}-${index}-${Math.random().toString(36).slice(2, 8)}`,
          kind: currentMaterialKind,
          categoryId,
          title: files.length > 1 ? `${title} ${index + 1}` : title,
          fileName: file.name,
          image: await readFileAsDataUrl(file),
          linkUrl,
          source: "local",
          createdAt,
          createdBy,
        })),
      );

      const linkOnlyMaterial =
        isReferenceLink && linkLines.length
          ? [
              {
                id: `link-group-${uploadBatchId}-${Math.random().toString(36).slice(2, 8)}`,
                kind: currentMaterialKind,
                categoryId,
                title,
                fileName: `${linkLines.length}개 링크`,
                image: "",
                linkUrl,
                links: linkLines,
                source: "local",
                createdAt,
                createdBy,
              },
            ]
          : [];
      nextMaterials = [...storedMaterials, ...uploadedMaterials, ...linkOnlyMaterial];
    }

    saveStoredMaterials(nextMaterials);
    await persistSharedMaterialState();
    renderSalesLibrary();
    closeMaterialModal();
    showToast(isEditing ? "자료가 수정되었습니다." : "자료가 등록되었습니다.");
  } catch (error) {
    console.error("자료 등록 실패", error);
    showToast(`자료 등록 중 오류가 발생했습니다. ${error.message || ""}`.trim());
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
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
  showToast(didCopyUrl ? "이미지 주소를 복사했습니다." : "이 브라우저에서는 복사를 지원하지 않습니다.");
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

async function deleteMaterial(materialId) {
  const material = getAllMaterials().find((item) => item.id === materialId);
  if (!material) return;

  if (!window.confirm(`"${material.title}" 자료를 삭제하시겠습니까?`)) return;

  if (material.source === "asset") {
    saveDeletedAssetIds([...new Set([...getDeletedAssetIds(), material.id])]);
  } else {
    saveStoredMaterials(getStoredMaterials().filter((item) => item.id !== material.id));
  }
  selectedMaterialIds.delete(material.id);

  saveDeleteLogs([
    {
      id: `delete-${Date.now()}`,
      materialTitle: material.title,
      fileName: material.fileName || "등록 이미지",
      deletedAt: formatDateTime(),
      deletedBy: `${currentUserData.name} (${currentUserData.id})`,
    },
    ...getDeleteLogs(),
  ]);

  try {
    await persistSharedMaterialState();
  } catch (error) {
    console.error("자료 삭제 공유 저장 실패", error);
    showToast("공유 저장소 반영 중 오류가 발생했습니다.");
    return;
  }

  renderSalesLibrary();
  renderTrashLogs();
  showToast("자료가 삭제되었습니다.");
}

function renderTrashLogs() {
  const logs = getDeleteLogs();
  if (!logs.length) {
    trashLogList.innerHTML = `<div class="empty-category">삭제 기록이 없습니다.</div>`;
    return;
  }

  const groupedLogs = logs.reduce((groups, log) => {
    const owner = log.deletedBy || "알 수 없음";
    groups[owner] = groups[owner] || [];
    groups[owner].push(log);
    return groups;
  }, {});

  trashLogList.innerHTML = Object.entries(groupedLogs)
    .map(
      ([owner, ownerLogs]) => `
        <section class="trash-owner-group">
          <div class="trash-owner-head">
            <strong>${escapeHtml(owner)}</strong>
            <span>${ownerLogs.length}개 삭제</span>
          </div>
          <div class="trash-owner-list">
            ${ownerLogs
              .map(
                (log) => `
                  <article class="trash-log-card">
                    <strong>${escapeHtml(log.materialTitle)}</strong>
                    <span>${escapeHtml(log.fileName)}</span>
                    <small>삭제일시: ${escapeHtml(log.deletedAt)}</small>
                    <small>삭제자: ${escapeHtml(log.deletedBy)}</small>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

function toggleMaterialExpanded(materialId) {
  if (expandedMaterialIds.has(materialId)) {
    expandedMaterialIds.delete(materialId);
  } else {
    expandedMaterialIds.add(materialId);
  }

  renderSalesLibrary();
}

function getActiveVaultMaterials() {
  return getAllMaterials().filter((material) => getMaterialKind(material) === activeMaterialVault);
}

function toggleMaterialSelection(materialId, checked) {
  if (checked) {
    selectedMaterialIds.add(materialId);
  } else {
    selectedMaterialIds.delete(materialId);
  }

  renderSalesLibrary();
}

function toggleVisibleMaterialSelection() {
  const visibleMaterials = getActiveVaultMaterials();
  const allSelected = visibleMaterials.length > 0 && visibleMaterials.every((material) => selectedMaterialIds.has(material.id));

  visibleMaterials.forEach((material) => {
    if (allSelected) {
      selectedMaterialIds.delete(material.id);
    } else {
      selectedMaterialIds.add(material.id);
    }
  });

  renderSalesLibrary();
}

function toggleCategoryMaterialSelection(categoryId) {
  const categoryMaterials = getActiveVaultMaterials().filter((material) => material.categoryId === categoryId);
  const allSelected = categoryMaterials.length > 0 && categoryMaterials.every((material) => selectedMaterialIds.has(material.id));

  categoryMaterials.forEach((material) => {
    if (allSelected) {
      selectedMaterialIds.delete(material.id);
    } else {
      selectedMaterialIds.add(material.id);
    }
  });

  openCategoryIds.add(`${activeMaterialVault}:${categoryId}`);
  renderSalesLibrary();
}

function updateMaterialSearch(value, immediate = false) {
  materialSearchTerm = value;
  window.clearTimeout(materialSearchTimer);

  const renderSearch = () => {
    renderSalesLibrary();
    requestAnimationFrame(() => {
      const searchInput = document.querySelector("#materialCategorySearch");
      if (searchInput) {
        searchInput.focus();
        searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
      }
    });
  };

  if (immediate) {
    renderSearch();
    return;
  }

  materialSearchTimer = window.setTimeout(renderSearch, 280);
}

function getSelectedVisibleMaterials() {
  return getActiveVaultMaterials().filter((material) => selectedMaterialIds.has(material.id));
}

async function downloadSelectedMaterials() {
  const selectedMaterials = getSelectedVisibleMaterials().filter((material) => material.image);

  if (!selectedMaterials.length) {
    showToast("다운로드할 이미지 자료를 선택해 주세요.");
    return;
  }

  for (const material of selectedMaterials) {
    await downloadMaterialImage(material);
  }

  showToast(`${selectedMaterials.length}개 이미지 다운로드를 시작했습니다.`);
}

async function copySelectedMaterials() {
  const selectedMaterials = getSelectedVisibleMaterials();

  if (!selectedMaterials.length) {
    showToast("복사할 자료를 선택해 주세요.");
    return;
  }

  if (selectedMaterials.length === 1 && selectedMaterials[0].image) {
    await copyMaterialImage(selectedMaterials[0]);
    return;
  }

  const copyText = selectedMaterials
    .map((material) => {
      const links = Array.isArray(material.links) ? material.links : material.linkUrl ? [material.linkUrl] : [];
      return `${material.title}\n${links.length ? links.join("\n") : material.fileName || "이미지 자료"}`;
    })
    .join("\n\n");
  const copied = await copyTextToClipboard(copyText);
  showToast(copied ? `${selectedMaterials.length}개 자료 정보를 복사했습니다.` : "이 브라우저에서는 복사를 지원하지 않습니다.");
}

function handleMaterialClick(event) {
  const categorySelection = event.target.closest("[data-action='select-category-materials']");
  if (categorySelection) {
    event.preventDefault();
    event.stopPropagation();
    toggleCategoryMaterialSelection(categorySelection.dataset.categoryId);
    return;
  }

  const categoryToggle = event.target.closest("[data-action='toggle-category']");
  if (categoryToggle) {
    const body = categoryToggle.closest(".resource-category").querySelector(".category-body");
    if (!body) return;
    const isCollapsed = body.classList.toggle("collapsed");
    categoryToggle.setAttribute("aria-expanded", String(!isCollapsed));
    const categoryId = categoryToggle.closest(".resource-category").dataset.categoryId;
    const categoryKey = `${activeMaterialVault}:${categoryId}`;
    if (isCollapsed) {
      openCategoryIds.delete(categoryKey);
    } else {
      openCategoryIds.add(categoryKey);
    }
    return;
  }

  const selectionInput = event.target.closest("[data-action='select-material']");
  if (selectionInput) {
    toggleMaterialSelection(selectionInput.dataset.materialId, selectionInput.checked);
    return;
  }

  const bulkAction = event.target.closest("[data-action='select-visible-materials'], [data-action='download-selected-materials'], [data-action='copy-selected-materials']");
  if (bulkAction) {
    if (bulkAction.dataset.action === "select-visible-materials") toggleVisibleMaterialSelection();
    if (bulkAction.dataset.action === "download-selected-materials") downloadSelectedMaterials();
    if (bulkAction.dataset.action === "copy-selected-materials") copySelectedMaterials();
    return;
  }

  const preview = event.target.closest(".document-preview");
  if (preview) {
    event.preventDefault();
    const card = preview.closest(".document-card");
    const materialId = card?.dataset.materialId;
    if (materialId) toggleMaterialSelection(materialId, !selectedMaterialIds.has(materialId));
    return;
  }

  const button = event.target.closest("button[data-action], a[data-action]");
  if (!button) return;
  if (button.closest(".document-actions") && button.dataset.action === "toggle-image") {
    event.preventDefault();
  }

  const materialId = button.dataset.materialId;
  const material = getAllMaterials().find((item) => item.id === materialId);
  if (!material) return;

  if (button.dataset.action === "copy-link") {
    const links = Array.isArray(material.links) ? material.links : material.linkUrl ? [material.linkUrl] : [];
    copyTextToClipboard(links.join("\n")).then((copied) => showToast(copied ? "레퍼런스 링크를 복사했습니다." : "이 브라우저에서는 복사를 지원하지 않습니다."));
  }
  if (button.dataset.action === "copy-image") copyMaterialImage(material);
  if (button.dataset.action === "download-image") downloadMaterialImage(material);
  if (button.dataset.action === "edit-image") openEditMaterialModal(material.id);
  if (button.dataset.action === "delete-image") deleteMaterial(material.id);
  if (button.dataset.action === "toggle-image" && material.image) toggleMaterialExpanded(material.id);
}

function showDashboard(user) {
  currentUserData = user;
  currentUser.textContent = `${user.name} (${user.id})`;
  loginView.classList.add("hidden");
  dashboardView.classList.remove("hidden");
}

function showPage(page) {
  const pageTitles = {
    inbound: "인바운드 DB",
    sales: "영업자료 (이미지)",
    "text-sales": "영업자료 (텍스트)",
    clients: "거래처 관리",
    settlement: "정산관리",
  };

  const isSameClientClick = page === "clients" && currentPage === "clients";
  if (isSameClientClick) {
    clientSubnavExpanded = !clientSubnavExpanded;
  } else {
    clientSubnavExpanded = page === "clients";
  }

  currentPage = page;
  pageTitle.textContent = pageTitles[page] || pageTitles.inbound;
  inboundPage.classList.toggle("hidden", page !== "inbound");
  salesPage.classList.toggle("hidden", page !== "sales");
  textSalesPage.classList.toggle("hidden", page !== "text-sales");
  clientsPage.classList.toggle("hidden", page !== "clients");
  settlementPage.classList.toggle("hidden", page !== "settlement");
  clientSubnav.classList.toggle("collapsed", !clientSubnavExpanded);

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.page === page);
  });

  if (page === "text-sales" && !papaAiDocumentCache.has(selectedPapaAiDocumentId)) {
    loadPapaAiDocument(selectedPapaAiDocumentId);
  }

  if (page === "inbound") {
    renderInboundLeads();
  }

  if (page === "clients") {
    renderClients();
  }
}

function isMatchingPassword(user, password) {
  return user.password === password || user.passwordAliases?.includes(password);
}

function selectClientOwner(owner) {
  selectedClientOwner = owner;
  currentPage = "clients";
  clientSubnavExpanded = true;
  renderClients();
  pageTitle.textContent = "거래처 관리";
  inboundPage.classList.add("hidden");
  salesPage.classList.add("hidden");
  inboundPage.classList.add("hidden");
  textSalesPage.classList.add("hidden");
  clientsPage.classList.remove("hidden");
  settlementPage.classList.add("hidden");
  clientSubnav.classList.remove("collapsed");
  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.page === "clients");
  });
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const userId = formData.get("userId")?.trim();
  const password = formData.get("password")?.trim();
  const user = users.find((item) => item.id === userId && isMatchingPassword(item, password));

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
  showPage("inbound");
});

sidebarToggle.addEventListener("click", () => {
  const collapsed = sidebar.classList.toggle("collapsed");
  sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
  sidebarToggle.setAttribute("aria-label", collapsed ? "대시보드 펼치기" : "대시보드 접기");
  sidebarToggle.innerHTML = icon(collapsed ? "panel-left-open" : "panel-left-close");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => showPage(item.dataset.page));
});

document.querySelectorAll("[data-vault-kind]").forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    selectMaterialVault(card.dataset.vaultKind);
  });
});

clientSubnav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-owner]");
  if (button) selectClientOwner(button.dataset.owner);
});

clientOwnerTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-owner]");
  if (button) selectClientOwner(button.dataset.owner);
});

openMaterialModalButton.addEventListener("click", () => openMaterialModal("pricing"));
openReferenceMaterialModalButton.addEventListener("click", () => openMaterialModal("reference-image"));
openReferenceLinkModalButton.addEventListener("click", () => openMaterialModal("reference-link"));
closeMaterialModalButton.addEventListener("click", closeMaterialModal);
cancelMaterialModalButton.addEventListener("click", closeMaterialModal);
materialModal.addEventListener("click", (event) => {
  if (event.target === materialModal) closeMaterialModal();
});
materialForm.addEventListener("submit", handleMaterialSubmit);
materialsLibrary.addEventListener("click", handleMaterialClick);
materialsLibrary.addEventListener("compositionstart", (event) => {
  if (event.target.id === "materialCategorySearch") materialSearchComposing = true;
});
materialsLibrary.addEventListener("compositionend", (event) => {
  if (event.target.id === "materialCategorySearch") {
    materialSearchComposing = false;
    updateMaterialSearch(event.target.value, true);
  }
});
materialsLibrary.addEventListener("input", (event) => {
  if (event.target.id === "materialCategorySearch" && !materialSearchComposing) {
    updateMaterialSearch(event.target.value);
  }
});

openTrashLogButton.addEventListener("click", () => {
  renderTrashLogs();
  trashModal.classList.remove("hidden");
});
closeTrashModalButton.addEventListener("click", () => trashModal.classList.add("hidden"));
trashModal.addEventListener("click", (event) => {
  if (event.target === trashModal) trashModal.classList.add("hidden");
});

aiDocList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-doc-id]");
  if (button) loadPapaAiDocument(button.dataset.docId);
});
aiDocSearch.addEventListener("input", renderPapaAiDocumentContent);

inboundTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lead-id]");
  if (!button) return;
  toggleInboundContact(button.dataset.leadId);
});

const previewButtons = document.querySelectorAll(".preview-button");
const previewSectionButtons = document.querySelectorAll(".preview-section-button");
const previewApplyButton = document.querySelector("#previewApplyButton");
const previewFitButton = document.querySelector("#previewFitButton");
const previewWidthInput = document.querySelector("#previewWidthInput");
const appShell = document.querySelector(".app-shell");
const landingPreview = document.querySelector("#landingPreview");

function updatePreviewMode(width) {
  document.body.classList.toggle("preview-mobile", width <= 520);
  document.body.classList.toggle("preview-tablet", width > 520 && width <= 900);
}

function setPreviewWidth(value, button) {
  const isFull = value === "100%";
  const width = isFull ? window.innerWidth - 96 : Number(value);
  const clampedWidth = Math.max(360, Math.min(1920, width || 1440));

  document.documentElement.style.setProperty("--preview-width", isFull ? "100%" : `${clampedWidth}px`);
  previewWidthInput.value = String(clampedWidth);
  updatePreviewMode(isFull ? window.innerWidth : clampedWidth);

  previewButtons.forEach((previewButton) => previewButton.classList.remove("is-active"));
  if (button) button.classList.add("is-active");
}

function setActivePreviewSection(section) {
  const isLanding = section === "landing";

  appShell.classList.toggle("hidden", isLanding);
  landingPreview.classList.toggle("hidden", !isLanding);
  previewSectionButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.previewSection === section);
  });
}

previewButtons.forEach((button) => {
  button.addEventListener("click", () => setPreviewWidth(button.dataset.previewWidth, button));
});
previewSectionButtons.forEach((button) => {
  button.addEventListener("click", () => setActivePreviewSection(button.dataset.previewSection));
});
previewApplyButton.addEventListener("click", () => setPreviewWidth(previewWidthInput.value));
previewWidthInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") setPreviewWidth(previewWidthInput.value);
});
previewFitButton.addEventListener("click", () => setPreviewWidth("100%", previewFitButton));

async function initializeApp() {
  renderCategoryOptions();
  renderInboundLeads();
  await loadSharedMaterialState();
  renderSalesLibrary();
  renderPapaAiDocumentList();
  renderClientNavigation();
  renderClients();
}

initializeApp();
