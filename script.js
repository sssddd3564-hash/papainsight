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
const clientsPage = document.querySelector("#clientsPage");
const papaAiPage = document.querySelector("#papaAiPage");
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
const papaAiPrompt = document.querySelector("#papaAiPrompt");
const papaAiOutput = document.querySelector("#papaAiOutput");
const runPapaAiButton = document.querySelector("#runPapaAiButton");

const papaAiTemplates = {
  proposal:
    "신규 거래처 업종: \n관심 서비스: \n고객이 중요하게 보는 점: \n위 내용을 바탕으로 카카오톡으로 보낼 짧은 제안 문구를 작성해줘.",
  reply:
    "고객 질문: \n현재 상황: \n확인 필요한 정보: \n위 내용을 바탕으로 친절하고 신뢰감 있는 상담 답변을 작성해줘.",
  checklist:
    "거래처명: \n계약 서비스: \n시작 예정일: \n위 내용을 바탕으로 담당자가 확인할 작업 체크리스트를 만들어줘.",
};

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
          <a class="mini-button" href="${material.image}" download="${escapeHtml(material.fileName || `${material.title}.png`)}">다운로드</a>
          <button class="mini-button" type="button" data-action="copy-image" data-material-id="${material.id}">복사</button>
          ${material.source === "local" ? `<button class="mini-button danger" type="button" data-action="delete-image" data-material-id="${material.id}">삭제</button>` : ""}
        </div>
      </div>
    </article>
  `;
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

async function copyMaterialImage(material) {
  try {
    const response = await fetch(material.image);
    const blob = await response.blob();

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      showToast("이미지를 클립보드에 복사했습니다.");
      return;
    }
  } catch (error) {
    console.warn("이미지 복사 실패", error);
  }

  try {
    await navigator.clipboard.writeText(material.image);
    showToast("이미지 주소를 복사했습니다.");
  } catch (error) {
    showToast("이 브라우저에서는 복사를 지원하지 않습니다.");
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

  if (button.dataset.action === "delete-image") {
    deleteStoredMaterial(material.id);
  }
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
}

function applyPapaAiTemplate(templateId) {
  const template = papaAiTemplates[templateId];
  if (!template) return;

  papaAiPrompt.value = template;
  papaAiPrompt.focus();
}

function createPapaAiDraft() {
  const prompt = papaAiPrompt.value.trim();
  if (!prompt) {
    showToast("파파AI 요청 내용을 입력해 주세요.");
    papaAiPrompt.focus();
    return;
  }

  papaAiOutput.textContent = [
    "초안",
    "",
    "안녕하세요, 파파컴퍼니입니다.",
    "말씀 주신 내용을 기준으로 현재 상황에 맞는 진행 방향을 정리해 드리겠습니다.",
    "",
    "1. 고객 니즈를 먼저 확인하고 필요한 자료를 안내합니다.",
    "2. 서비스 범위와 예상 진행 일정을 간단히 공유합니다.",
    "3. 다음 액션은 담당자가 확인 후 바로 이어갈 수 있도록 체크리스트로 남깁니다.",
    "",
    `요청 요약: ${prompt.slice(0, 120)}${prompt.length > 120 ? "..." : ""}`,
  ].join("\n");

  showToast("파파AI 초안이 생성되었습니다.");
}

function handlePapaAiTemplateClick(event) {
  const button = event.target.closest("[data-template]");
  if (!button) return;

  applyPapaAiTemplate(button.dataset.template);
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
runPapaAiButton.addEventListener("click", createPapaAiDraft);
papaAiPage.addEventListener("click", handlePapaAiTemplateClick);

renderCategoryOptions();
renderSalesLibrary();
renderClients();
