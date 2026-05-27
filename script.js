const users = [
  {
    id: "papa.admin",
    password: "1234",
    name: "관리자",
  },
];

const businessLicenses = [
  {
    title: "파파컴퍼니 사업자등록증",
    company: "주식회사 파파컴퍼니",
    image: "assets/business-licenses/papa-company-license.jpg",
    updatedAt: "2024-08-16",
  },
  {
    title: "맘마케팅 사업자등록증",
    company: "맘마케팅",
    image: "assets/business-licenses/mom-marketing-license.png",
    updatedAt: "2023-07-16",
  },
];

const placeImageSheets = [
  {
    title: "플레이스 이미지표 A",
    description: "이미지 수급 후 이 영역에 바로 추가됩니다.",
    status: "대기",
  },
  {
    title: "플레이스 이미지표 B",
    description: "업종별 플레이스 이미지표를 나열할 예정입니다.",
    status: "대기",
  },
  {
    title: "플레이스 이미지표 C",
    description: "추후 이미지 파일을 받으면 카드가 이미지 미리보기로 바뀝니다.",
    status: "대기",
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
  {
    name: "오렌지파트너스",
    type: "B2B",
    status: "진행 중",
    statusClass: "active",
    renewal: "2026-06-15",
    owner: "김팀장",
  },
  {
    name: "블루하우스",
    type: "B2C",
    status: "자료 대기",
    statusClass: "pending",
    renewal: "2026-06-02",
    owner: "이매니저",
  },
  {
    name: "그린커머스",
    type: "B2B",
    status: "완료",
    statusClass: "done",
    renewal: "2026-07-01",
    owner: "박대리",
  },
  {
    name: "스타트홈",
    type: "B2C",
    status: "연장 확인 필요",
    statusClass: "risk",
    renewal: "2026-05-30",
    owner: "최매니저",
  },
];

const loginView = document.querySelector("#loginView");
const dashboardView = document.querySelector("#dashboardView");
const loginForm = document.querySelector("#loginForm");
const logoutButton = document.querySelector("#logoutButton");
const currentUser = document.querySelector("#currentUser");
const pageTitle = document.querySelector("#pageTitle");
const salesPage = document.querySelector("#salesPage");
const clientsPage = document.querySelector("#clientsPage");
const navItems = document.querySelectorAll(".nav-item");

function renderBusinessLicenses() {
  const businessLicenseGrid = document.querySelector("#businessLicenseGrid");
  document.querySelector("#licenseCount").textContent = `${businessLicenses.length}개 자료`;

  businessLicenseGrid.innerHTML = businessLicenses
    .map(
      (license) => `
        <article class="document-card">
          <a class="document-preview" href="${license.image}" target="_blank" rel="noreferrer">
            <img src="${license.image}" alt="${license.title}" loading="lazy" />
          </a>
          <div class="document-meta">
            <span class="tag">사업자등록증</span>
            <h5>${license.title}</h5>
            <p>${license.company}</p>
            <small>기준일: ${license.updatedAt}</small>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderPlaceImageSheets() {
  const placeImageGrid = document.querySelector("#placeImageGrid");
  document.querySelector("#placeImageCount").textContent = `${placeImageSheets.length}개 슬롯`;

  placeImageGrid.innerHTML = placeImageSheets
    .map(
      (sheet) => `
        <article class="placeholder-card">
          <span class="tag">${sheet.status}</span>
          <h5>${sheet.title}</h5>
          <p>${sheet.description}</p>
        </article>
      `,
    )
    .join("");
}

function renderResources() {
  const resourceGrid = document.querySelector("#resourceGrid");
  document.querySelector("#resourceCount").textContent = `${resources.length}개 자료`;

  resourceGrid.innerHTML = resources
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
    .join("");
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
  const isSales = page === "sales";
  pageTitle.textContent = isSales ? "영업자료" : "거래처 관리";
  salesPage.classList.toggle("hidden", !isSales);
  clientsPage.classList.toggle("hidden", isSales);

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.page === page);
  });
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

renderBusinessLicenses();
renderPlaceImageSheets();
renderResources();
renderClients();
