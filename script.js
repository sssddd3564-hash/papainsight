const users = [
  { id: "papa.admin", idAliases: ["admin", "관리자"], password: "1234", name: "관리자", role: "admin" },
  { id: "이신", password: "ss1234", passwordAliases: ["ㄴㄴ1234"], name: "이신", role: "staff" },
  { id: "정복", password: "5263", name: "정복", role: "staff" },
  { id: "지영", password: "5662", name: "지영", role: "staff" },
  { id: "용진", password: "9543", name: "용진", role: "staff" },
  { id: "정완", password: "9630", name: "정완", role: "staff" },
  { id: "현민", password: "4634", name: "현민", role: "staff" },
  { id: "오찬", password: "7468", name: "오찬", role: "staff" },
  { id: "도영", password: "8462", name: "도영", role: "staff" },
];

const guaranteedLoginUsers = [
  { id: "papa.admin", idAliases: ["admin", "관리자"], password: "1234", name: "관리자", role: "admin" },
  { id: "이신", password: "ss1234", passwordAliases: ["ㄴㄴ1234"], name: "이신", role: "staff" },
  { id: "정복", password: "5263", name: "정복", role: "staff" },
  { id: "지영", password: "5662", name: "지영", role: "staff" },
  { id: "용진", password: "9543", name: "용진", role: "staff" },
  { id: "정완", password: "9630", name: "정완", role: "staff" },
  { id: "현민", password: "4634", name: "현민", role: "staff" },
  { id: "오찬", password: "7468", name: "오찬", role: "staff" },
  { id: "도영", password: "8462", name: "도영", role: "staff" },
];

const appVersion = "0.1";
const materialStorageKey = "papainsight.salesMaterials.v2";
const deletedMaterialStorageKey = "papainsight.deletedMaterials.v1";
const deletedAssetStorageKey = "papainsight.deletedAssetIds.v1";
const inboundContactStorageKey = "papainsight.inboundContacts.v1";
const materialApiEndpoint = "/api/materials";

function createMaterialMidCategories() {
  return [
    {
      id: "place",
      name: "플레이스",
      color: "#185FA5",
      subCategories: [
        { name: "리워드 (트래픽)", desc: "플레이스 트래픽 리워드 영업자료" },
        { name: "블로그", desc: "플레이스 블로그 영업자료" },
        { name: "영수증", desc: "플레이스 영수증 리뷰 영업자료" },
        { name: "클립", desc: "플레이스 클립 영업자료" },
        { name: "샤오홍슈", desc: "플레이스 샤오홍슈 영업자료" },
      ],
    },
    {
      id: "open-market",
      name: "오픈마켓",
      color: "#3B6D11",
      subCategories: [
        { name: "쇼핑", desc: "네이버 쇼핑 영업자료" },
        { name: "쿠팡", desc: "쿠팡 영업자료" },
      ],
    },
    {
      id: "other-platform",
      name: "그 외 플랫폼",
      color: "#BA7517",
      subCategories: [
        { name: "SNS 리워드", desc: "SNS 리워드 영업자료" },
        { name: "당근마켓", desc: "당근마켓 영업자료" },
        { name: "홈페이지 제작", desc: "홈페이지 제작 영업자료" },
      ],
    },
  ];
}

const CATEGORIES = [
  {
    id: "price-guide",
    name: "단가 및 설명 이미지",
    icon: "photo",
    description: "상품 단가표, 설명 이미지, 영업 안내 이미지",
    hasMid: true,
    midCategories: createMaterialMidCategories(),
  },
  {
    id: "reference-image",
    name: "레퍼런스 이미지",
    icon: "photo-search",
    description: "상품별 참고 이미지와 사례 이미지",
    hasMid: true,
    midCategories: createMaterialMidCategories(),
  },
  {
    id: "reference-link",
    name: "레퍼런스 링크",
    icon: "link",
    description: "여러 레퍼런스 URL을 묶음 카드로 관리",
    hasMid: true,
    midCategories: createMaterialMidCategories(),
  },
];

const materialCategoryIdMap = {
  "리워드 (트래픽)": "place-reward",
  블로그: "place-blog",
  영수증: "place-receipt",
  클립: "clip-top-rank",
  샤오홍슈: "xiaohongshu",
  쇼핑: "naver-shopping",
  쿠팡: "coupang-slot",
  "SNS 리워드": "sns-reward",
  당근마켓: "carrot-market",
  "홈페이지 제작": "homepage-production",
};

const materialMidDotColors = {
  place: "#185FA5",
  "open-market": "#3B6D11",
  "other-platform": "#BA7517",
};

const materialCategories = createMaterialMidCategories().flatMap((midCategory) =>
  midCategory.subCategories.map((subCategory) => ({
    id: materialCategoryIdMap[subCategory.name],
    name: subCategory.name,
    hint: subCategory.desc,
    midId: midCategory.id,
    midName: midCategory.name,
  })),
);

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

const salesTextGroups = [
  {
    id: "reward",
    title: "리워드(트래픽)",
    description: "플레이스 유입, 저장, 길찾기, 복합 미션 계열 실행사 핵심 조건입니다.",
    accent: "green",
    rows: [
      { major: "리워드(트래픽)", middle: "트래픽", small: "퀴즈형", executor: "그린피", product: "리워드 트래픽", price: "20원", operation: "플레이스당 최소 50타 / 16:30 당일 가능", refund: "접수 전 취소 가능 / 구동 후 협의", memo: "보수 80~100%, 우수 광고주 100~150%" },
      { major: "리워드(트래픽)", middle: "트래픽", small: "오퍼월", executor: "엔비티", product: "리워드 트래픽", price: "20원 / 복합 25~30원", operation: "키워드당 일 20타 / 18:00 당일 가능", refund: "접수 전 취소", memo: "분할 최소 50타 기준" },
      { major: "리워드(트래픽)", middle: "올매체", small: "자동처리", executor: "레피드", product: "올매체 리워드", price: "30원", operation: "100타 / 최소 7일 / 당일·주말 불가", refund: "취소·환불 불가", memo: "키워드 없이 접수 가능" },
      { major: "리워드(트래픽)", middle: "올매체", small: "프로", executor: "레피드프로", product: "올매체 리워드", price: "33원", operation: "100타 / 최소 7일 / 자동처리", refund: "취소·환불 불가", memo: "레피드 상위 라인" },
      { major: "리워드(트래픽)", middle: "저장", small: "저장하기", executor: "일론(창해)", product: "리워드 저장하기", price: "38원", operation: "100타 단위 / 12:00 전 당일 가능", refund: "통계 미반영 시 환불 가능", memo: "보수 80%, 통상 90%+" },
      { major: "리워드(트래픽)", middle: "복합", small: "유입+저장", executor: "코넷", product: "유입+저장 리워드", price: "20원", operation: "10타 단위 / 15:00 당일 가능", refund: "당일차감 후 환불 / 미구동 익일 반영", memo: "미구동 익일 반영 시 100%" },
      { major: "리워드(트래픽)", middle: "트래픽", small: "유입", executor: "말차", product: "리워드 트래픽", price: "38원", operation: "10타 단위 분산 세팅 가능", refund: "당일취소 / 익일환불", memo: "시장가 40원 기준" },
      { major: "리워드(트래픽)", middle: "저장", small: "저장", executor: "말차", product: "리워드 저장", price: "38원", operation: "10타 단위 분산 세팅 가능", refund: "당일취소 / 익일환불", memo: "시장가 40원 기준" },
      { major: "리워드(트래픽)", middle: "신규미션", small: "영업시간", executor: "말차", product: "영업시간 미션", price: "38원", operation: "10타 단위 / 엑셀 발주", refund: "중단 후 환불 불가", memo: "신규 리워드 접수방 이용 필수 / 맛집 효율 우수" },
      { major: "리워드(트래픽)", middle: "신규미션", small: "길찾기", executor: "말차", product: "신규 길찾기", price: "43원", operation: "당일 가능 / 엑셀 발주", refund: "중단 후 환불 불가", memo: "시장가 45원 기준" },
      { major: "리워드(트래픽)", middle: "트래픽", small: "호올스", executor: "호올스", product: "리워드 트래픽", price: "33원", operation: "최소 50타 / 주말 키워드 수정 가능", refund: "당일취소 / 익일환불", memo: "구지도 단일키워드 허용, 복합 키워드 권장" },
      { major: "리워드(트래픽)", middle: "저장", small: "호올스", executor: "호올스", product: "리워드 저장", price: "33원", operation: "최소 100타", refund: "당일취소 / 익일환불", memo: "구지도 키워드만 허용 / 5위권 밖 / 자연유입 불가" },
      { major: "리워드(트래픽)", middle: "복합미션", small: "다원화", executor: "투플", product: "검색·저장·공유·알림·길찾기", price: "40원", operation: "100타 단위 / 익일구동만", refund: "구동 중 취소·중단 불가", memo: "네이버 플레이스 등록 업체만" },
      { major: "리워드(트래픽)", middle: "복합미션", small: "스마트콜 포함", executor: "투플 프로", product: "다원화 미션 + 스마트콜", price: "45원", operation: "100타 단위 / 익일구동만", refund: "구동 중 취소·중단 불가", memo: "네이버전화 필수 / ARS 4번 매장위치 ON 필요" },
      { major: "리워드(트래픽)", middle: "길찾기", small: "유입형", executor: "홈런볼", product: "길찾기 유입형 리워드", price: "23원", operation: "당일 마감 13:00 / 평일 19:00, 주말 17:00", refund: "문서 내 미언급", memo: "호올스와 10~20% 병행 권장" },
      { major: "리워드(트래픽)", middle: "트래픽", small: "피크", executor: "피크(올데이)", product: "리워드 트래픽", price: "24원/타", operation: "UI 내 자유 / 당일 가능", refund: "잔여포인트 환불 가능", memo: "올데이 라인" },
      { major: "리워드(트래픽)", middle: "저장", small: "피크", executor: "피크(프리저)", product: "리워드 저장", price: "21원 / 맛집 30원", operation: "UI 내 자유 / 당일 가능", refund: "잔여포인트 환불 가능", memo: "맛집 단가 별도" },
      { major: "리워드(트래픽)", middle: "AI", small: "스마일", executor: "NNW", product: "AI 리워드 트래픽·저장", price: "트래픽 40원 / 저장 45원", operation: "10타 이상 / 16:00 당일 가능", refund: "익일부터 잔여타수 x 단가 환불", memo: "셀러가 45/50원" },
      { major: "리워드(트래픽)", middle: "오퍼월", small: "츄잉·푸딩", executor: "일트", product: "트래픽·저장·공유", price: "트래픽 20원 / 저장 30원", operation: "트래픽 100타, 저장 50타 / 18:00 당일 가능", refund: "문서 내 미언급", memo: "트래픽 90~100%, 저장 60~80%" },
    ],
  },
  {
    id: "blog",
    title: "블로그",
    description: "실계정 기자단, AI 배포, 실계정 블로그 배포 실행사 조건입니다.",
    accent: "cyan",
    rows: [
      { major: "블로그", middle: "실계정 기자단", small: "기본", executor: "더리블비", product: "실계정 기자단 배포", price: "800원/건", operation: "업체당 30건 / 17시 마감 / 원칙 익일", refund: "리뷰어 펑크 2건 내외 허용 / 미발행 환불", memo: "500자 이상, 사진 5장 이상" },
      { major: "블로그", middle: "실계정 기자단", small: "병의원·법률·건기식", executor: "더리블비", product: "특수 업종 배포", price: "1,100원/건", operation: "업체당 30건 / 원칙 익일", refund: "동일", memo: "300~500자, 사진 5장 이상" },
      { major: "블로그", middle: "실계정 기자단", small: "프리미엄 1000자+", executor: "더리블비", product: "프리미엄 배포", price: "1,500원/건", operation: "업체당 30건 / 17시 마감", refund: "동일", memo: "사진 10장 이상" },
      { major: "블로그", middle: "실계정 기자단", small: "프리미엄 2000자+", executor: "더리블비", product: "프리미엄 배포", price: "2,000원/건", operation: "업체당 30건 / 17시 마감", refund: "동일", memo: "사진 15장 이상" },
      { major: "블로그", middle: "준최블", small: "준최4~7", executor: "더리블비", product: "준최블 기자단 배포", price: "5,000원/건", operation: "업체당 10건 / 원칙 익일", refund: "수정·삭제 처리비용 발생", memo: "1,500~2,000자, 사진 15~20장" },
      { major: "블로그", middle: "AI 배포", small: "일반 사진 1장", executor: "피크마케팅", product: "실리뷰어 AI 배포", price: "350원/건", operation: "전체 10건~ / 일 최소 2건 / 18시 마감", refund: "미발행 건 취소 / 잔여 포인트 환불", memo: "금 18시 이후 월요일 익일" },
      { major: "블로그", middle: "AI 배포", small: "일반 사진 3장", executor: "피크마케팅", product: "실리뷰어 AI 배포", price: "450원/건", operation: "전체 10건~ / 일 최소 2건", refund: "동일", memo: "사진 수 옵션" },
      { major: "블로그", middle: "실계정", small: "1장 기본", executor: "피크마케팅", product: "실리뷰어 실계정", price: "350원/건", operation: "일 최소 2건 / 당일 18시", refund: "미발행 건 취소 / 잔여 포인트 환불", memo: "247계정 옵션은 450원" },
      { major: "블로그", middle: "실계정", small: "3장 기본", executor: "피크마케팅", product: "실리뷰어 실계정", price: "450원/건", operation: "일 최소 2건 / 당일 18시", refund: "동일", memo: "247계정 옵션은 550원" },
      { major: "블로그", middle: "실계정 블로그", small: "1차 론칭가", executor: "올인원AD", product: "실계정 블로그 배포", price: "600원/건 / 파파 400원", operation: "당일 가능 / 별도 마감 없음", refund: "블라인드 시 AS / AS 3~4개월", memo: "수량 제한 없음" },
      { major: "블로그", middle: "실계정 블로그", small: "2차 이후 예정", executor: "올인원AD", product: "실계정 블로그 배포", price: "800원/건~", operation: "당일 가능 / 별도 마감 없음", refund: "동일", memo: "수량별 단가 차등 예정" },
    ],
  },
  {
    id: "receipt",
    title: "영수증",
    description: "현재 보유 문서 안의 영수증 관련 운영 포인트만 우선 표기했습니다.",
    accent: "violet",
    rows: [
      { major: "영수증", middle: "리뷰", small: "전용 문서 필요", executor: "올인원AD", product: "영수증 리뷰", price: "전용 문서 참조", operation: "블로그 문서에서 전용 스펙 문서 참조로 안내", refund: "전용 문서 참조", memo: "영수증_리뷰_핵심스펙_제한사항_환불.md 추가 필요" },
      { major: "영수증", middle: "운영 상태", small: "블로그 중단 시", executor: "올인원AD", product: "영수증 리뷰", price: "전용 문서 참조", operation: "블로그 일시 중단 중에도 영수증 리뷰는 정상 진행으로 언급", refund: "전용 문서 참조", memo: "블로그 배포 문서 내 운영 분리 확인" },
      { major: "영수증", middle: "맛집 전략", small: "리워드 병행", executor: "일트 문서 언급", product: "맛집 키워드 운영", price: "상품별 문서 참조", operation: "맛집 플레이스는 트래픽 + 영수증리뷰 병행 권장", refund: "상품별 문서 참조", memo: "맛집 순위 관리 시 병행 전략으로 사용" },
      { major: "영수증", middle: "별점제", small: "운영 변경", executor: "일트 문서 언급", product: "영수증 리뷰 별점제", price: "상품별 문서 참조", operation: "2026-04-06 접수분부터 별점제로 전환 언급", refund: "상품별 문서 참조", memo: "상담 시 별점제 여부 확인 필요" },
      { major: "영수증", middle: "업종 주의", small: "효율 저하", executor: "가재울 문서 언급", product: "예약자리뷰 점수반영 업종", price: "상품별 문서 참조", operation: "미용실·펜션 등은 일부 리워드 효율 저하 가능", refund: "상품별 문서 참조", memo: "영수증리뷰 점수반영도가 높은 업종은 별도 판단" },
    ],
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
const materialFilePickerButton = document.querySelector("#materialFilePickerButton");
const materialFileStatus = document.querySelector("#materialFileStatus");
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
const salesTextTabs = document.querySelector("#salesTextTabs");
const salesTextContent = document.querySelector("#salesTextContent");
const inboundTableBody = document.querySelector("#inboundTableBody");

let activeSalesTextGroup = "reward";
let activeTextMajorCategoryId = "reward";
let activeTextMidCategoryId = "";
let activeTextSubCategoryName = "";
let salesTextSearchTerm = "";
let salesTextSearchComposing = false;
let selectedClientOwner = clientOwners[0];
let currentUserData = users[0];
let currentPage = "inbound";
let clientSubnavExpanded = false;
let currentMaterialKind = "pricing";
let activeMaterialVault = "pricing";
let activeMajorCategoryId = CATEGORIES[0].id;
let activeMidCategoryId = CATEGORIES[0].midCategories[0].id;
let activeSubCategoryName = CATEGORIES[0].midCategories[0].subCategories[0].name;
let editingMaterialId = null;
let materialSearchTerm = "";
let materialSearchComposing = false;
let materialSearchTimer = null;
const expandedMaterialIds = new Set();
const selectedMaterialIds = new Set();
const openCategoryIds = new Set();
const collapsedMaterialGroupIds = new Set();
const materialState = {
  serverAvailable: false,
  loaded: false,
  loadingPromise: null,
  materials: null,
  deletedAssetIds: null,
  deleteLogs: null,
};

function clearLegacyMaterialLocalCache() {
  if (!materialState.serverAvailable || !materialState.loaded || !Array.isArray(materialState.materials)) return;
  try {
    localStorage.removeItem(materialStorageKey);
    localStorage.removeItem(deletedAssetStorageKey);
    localStorage.removeItem(deletedMaterialStorageKey);
  } catch (error) {
    console.warn("구형 영업자료 로컬 백업 정리를 건너뜁니다.", error);
  }
}

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
  if (!materialState.serverAvailable) writeJson(materialStorageKey, materials);
}

function getDeletedAssetIds() {
  const ids = materialState.deletedAssetIds ?? readJson(deletedAssetStorageKey, []);
  return Array.isArray(ids) ? ids : [];
}

function saveDeletedAssetIds(ids) {
  materialState.deletedAssetIds = ids;
  if (!materialState.serverAvailable) writeJson(deletedAssetStorageKey, ids);
}

function getDeleteLogs() {
  const logs = materialState.deleteLogs ?? readJson(deletedMaterialStorageKey, []);
  return Array.isArray(logs) ? logs : [];
}

function saveDeleteLogs(logs) {
  materialState.deleteLogs = logs;
  if (!materialState.serverAvailable) writeJson(deletedMaterialStorageKey, logs);
}

function getMaterialStatePayload() {
  return {
    materials: getStoredMaterials(),
    deletedAssetIds: getDeletedAssetIds(),
    deleteLogs: getDeleteLogs(),
  };
}

function isMaterialStatePayload(payload) {
  return Boolean(payload) && Array.isArray(payload.materials) && Array.isArray(payload.deletedAssetIds) && Array.isArray(payload.deleteLogs);
}

function applyMaterialState(payload, options = {}) {
  if (!isMaterialStatePayload(payload)) return false;
  const nextMaterials = Array.isArray(payload.materials) ? payload.materials : [];
  const nextDeletedAssetIds = Array.isArray(payload.deletedAssetIds) ? payload.deletedAssetIds : [];
  const nextDeleteLogs = Array.isArray(payload.deleteLogs) ? payload.deleteLogs : [];

  if (!options.allowEmpty && nextMaterials.length === 0 && getStoredMaterials().length > 0) {
    console.warn("자료 저장소가 비어 있어 기존 자료 덮어쓰기를 건너뜁니다.");
    return false;
  }

  materialState.materials = nextMaterials;
  materialState.deletedAssetIds = nextDeletedAssetIds;
  materialState.deleteLogs = nextDeleteLogs;

  if (!options.skipLocalWrite) {
    writeJson(materialStorageKey, nextMaterials);
    writeJson(deletedAssetStorageKey, nextDeletedAssetIds);
    writeJson(deletedMaterialStorageKey, nextDeleteLogs);
  }
  return true;
}

async function fetchMaterialStateJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();
  const preview = text.slice(0, 24).trim();
  if (!contentType.includes("application/json") && !contentType.includes("text/json") && !preview.startsWith("{") && !preview.startsWith("[")) {
    throw new Error(`자료 저장소 응답이 JSON이 아닙니다: ${preview}`);
  }
  return JSON.parse(text);
}

async function loadSharedMaterialState() {
  try {
    const payload = await fetchMaterialStateJson(materialApiEndpoint);
    materialState.serverAvailable = true;
    applyMaterialState(payload, { skipLocalWrite: true });
    materialState.loaded = true;
    clearLegacyMaterialLocalCache();
  } catch (error) {
    materialState.serverAvailable = false;
    console.warn("공유 자료 저장소를 불러오지 못해 로컬 저장소로 동작합니다.", error);
    try {
      const fallbackPayload = await fetchMaterialStateJson(`data/materials-state.json?v=${Date.now()}`);
      applyMaterialState(fallbackPayload, { skipLocalWrite: true });
      materialState.loaded = true;
    } catch (fallbackError) {
      console.warn("정적 자료 백업도 불러오지 못했습니다.", fallbackError);
      materialState.loaded = true;
    }
  }
}

function ensureMaterialStateLoaded() {
  if (materialState.loaded) return Promise.resolve();
  if (!materialState.loadingPromise) {
    materialState.loadingPromise = loadSharedMaterialState().finally(() => {
      materialState.loadingPromise = null;
    });
  }
  return materialState.loadingPromise;
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
  applyMaterialState(payload, { skipLocalWrite: true });
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

function pulseInteraction(element) {
  if (!element) return;
  if (!isLocalPreviewHost) return;
  if (element.closest(".sidebar, .client-owner-tabs, .client-subnav") || element.classList.contains("contact-check")) return;
  element.classList.add("is-pressing");
  window.setTimeout(() => element.classList.remove("is-pressing"), 180);
}

function animatePageEntry(pageElement) {
  if (!pageElement || pageElement.classList.contains("hidden")) return;
  if (!isLocalPreviewHost) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  pageElement.classList.add("is-entering");
  window.setTimeout(() => pageElement.classList.remove("is-entering"), 180);
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

function getMaterialMimeType(material) {
  if (material.mimeType) return material.mimeType;
  const fileName = String(material.fileName || material.image || "").toLowerCase();
  if (fileName.endsWith(".pdf")) return "application/pdf";
  if (fileName.endsWith(".mp4")) return "video/mp4";
  if (fileName.endsWith(".webm")) return "video/webm";
  if (fileName.endsWith(".mov")) return "video/quicktime";
  if (fileName.endsWith(".gif")) return "image/gif";
  if (fileName.endsWith(".webp")) return "image/webp";
  if (fileName.endsWith(".png")) return "image/png";
  if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) return "image/jpeg";
  if (String(material.image || "").startsWith("data:")) {
    const match = String(material.image).match(/^data:([^;]+);base64,/);
    if (match) return match[1];
  }
  return material.image ? "image/*" : "";
}

function getMaterialMediaType(material) {
  if (material.mediaType) return material.mediaType;
  const mimeType = getMaterialMimeType(material);
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType === "application/pdf") return "pdf";
  if (mimeType.startsWith("image/") || material.image) return "image";
  return "link";
}

function getFileMediaType(file) {
  if (!file) return "";
  if (file.type.startsWith("video/")) return "video";
  if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) return "pdf";
  return "image";
}

function getMediaLabel(material) {
  return {
    image: "이미지 자료",
    video: "영상 자료",
    pdf: "PDF 자료",
    link: "링크 자료",
  }[getMaterialMediaType(material)] || "자료";
}

function getMaterialHref(material) {
  const links = Array.isArray(material.links) ? material.links : material.linkUrl ? [material.linkUrl] : [];
  return material.image || links[0] || "#";
}

const readableCategoryNames = {
  "place-reward": "플레이스 리워드",
  "place-blog": "플레이스 블로그",
  "place-receipt": "플레이스 영수증",
  "clip-top-rank": "클립 상위노출",
  xiaohongshu: "샤오홍슈",
  "naver-shopping": "네이버 쇼핑",
  "coupang-slot": "쿠팡",
  "sns-reward": "SNS 리워드",
  "carrot-market": "당근마켓",
  "homepage-production": "홈페이지 제작",
  "business-license": "사업자등록증",
  "product-sheet": "파파 전체 상품 이미지표",
};

function hasBrokenKoreanText(value) {
  const text = String(value || "").trim();
  if (!text) return false;
  const questionCount = (text.match(/\?/g) || []).length;
  return questionCount >= 2 && questionCount >= Math.ceil(text.length * 0.25);
}

function getReadableFileName(material) {
  const fileName = String(material.fileName || "").trim();
  if (!fileName || hasBrokenKoreanText(fileName)) return "";
  return fileName;
}

function getReadableMaterialTitle(material) {
  const title = String(material.title || "").trim();
  if (title && !hasBrokenKoreanText(title)) return title;

  const readableFileName = getReadableFileName(material);
  if (readableFileName) {
    return readableFileName.replace(/\.[^.]+$/, "");
  }

  const categoryName = readableCategoryNames[material.categoryId] || "영업자료";
  const suffix = String(material.id || "").slice(-6).toUpperCase();
  return `${categoryName} ${getMediaLabel(material)}${suffix ? ` ${suffix}` : ""}`;
}

function getReadableUserName(value) {
  const text = String(value || "").trim();
  if (!text || hasBrokenKoreanText(text)) return "등록자 확인 필요";
  return text;
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "");
}

function renderMaterials() {
  const allMaterials = getAllMaterials();
  materialsLibrary.innerHTML = renderMaterialVault(allMaterials);
  applyMediaNaming();
}

function applyMediaNaming() {
  document.querySelectorAll("[data-page='sales'] .nav-text").forEach((item) => {
    item.textContent = "영업자료 (미디어)";
  });
  if (currentPage === "sales" && pageTitle) {
    pageTitle.textContent = "영업자료 (미디어)";
  }
  const materialHeading = materialsLibrary?.querySelector(".material-page-head h3");
  if (materialHeading) {
    materialHeading.textContent = "영업자료 (미디어)";
  }
}

function getMajorMaterialKind(majorCategory) {
  return majorCategory.id === "price-guide" ? "pricing" : majorCategory.id;
}

function getMajorCategoryIds(majorCategory) {
  if (!majorCategory?.hasMid) return new Set();
  return new Set(
    majorCategory.midCategories.flatMap((midCategory) =>
      midCategory.subCategories.map((subCategory) => getSubCategoryId(subCategory.name)).filter(Boolean),
    ),
  );
}

function getMaterialsForMajor(majorCategory, allMaterials) {
  const majorKind = getMajorMaterialKind(majorCategory);
  const categoryIds = getMajorCategoryIds(majorCategory);
  return allMaterials.filter((material) => getMaterialKind(material) === majorKind && categoryIds.has(material.categoryId));
}

function getActiveMajorCategory() {
  return CATEGORIES.find((category) => category.id === activeMajorCategoryId) || CATEGORIES[0];
}

function getActiveMidCategory(majorCategory = getActiveMajorCategory()) {
  if (!majorCategory.hasMid) return null;
  return majorCategory.midCategories.find((category) => category.id === activeMidCategoryId) || majorCategory.midCategories[0];
}

function findSubCategoryMatchInMajor(majorCategory, searchTerm) {
  const normalizedSearch = normalizeSearchText(searchTerm);
  if (!majorCategory?.hasMid || !normalizedSearch) return null;

  for (const midCategory of majorCategory.midCategories) {
    const subCategory = midCategory.subCategories.find((item) => normalizeSearchText(item.name).includes(normalizedSearch));
    if (subCategory) return { midCategory, subCategory };
  }

  return null;
}

function getSubCategoryId(subCategoryName) {
  return materialCategoryIdMap[subCategoryName];
}

function getSubCategoryCount(materials, subCategoryName) {
  const categoryId = getSubCategoryId(subCategoryName);
  return materials.filter((material) => material.categoryId === categoryId).length;
}

function renderMaterialVault(allMaterials) {
  const activeMajor = getActiveMajorCategory();
  const activeMaterials = getMaterialsForMajor(activeMajor, allMaterials);
  const normalizedSearch = normalizeSearchText(materialSearchTerm);
  const majorCards = CATEGORIES.map((category) => renderMajorSelectionCard(category, allMaterials)).join("");
  const midRow = activeMajor.hasMid ? renderMidSelectionRow(activeMajor, activeMaterials) : "";
  const subList = activeMajor.hasMid ? renderSubCategoryList(activeMajor, getActiveMidCategory(activeMajor), activeMaterials, normalizedSearch) : "";

  return `
    <section class="material-vault-section hierarchy-vault-section">
      <div class="material-page-head">
        <h3>영업자료 (이미지)</h3>
        <label class="material-search fixed-search">
          <span>소분류 검색</span>
          <input id="materialCategorySearch" type="search" value="${escapeHtml(materialSearchTerm)}" placeholder="예: 블로그, 쿠팡" autocomplete="off" />
        </label>
      </div>
      <div class="major-selection-grid">${majorCards}</div>
      ${midRow}
      ${subList}
    </section>
  `;
}

function renderMajorSelectionCard(category, allMaterials) {
  const isActive = category.id === activeMajorCategoryId;
  const materialCount = getMaterialsForMajor(category, allMaterials).length;
  const iconMap = {
    "price-guide": "₩",
    "reference-image": "⌕",
    "reference-link": "↗",
  };
  const icon = iconMap[category.id] || "▧";

  return `
    <button class="major-select-card ${isActive ? "active" : ""}" type="button" data-action="select-major" data-major-id="${category.id}" data-major-theme="${category.id}">
      <div class="major-select-main">
        <span class="major-icon" aria-hidden="true">${icon}</span>
        <div>
          <strong>${escapeHtml(category.name)} <span class="major-inline-count">${materialCount}개 자료</span></strong>
          <p>${escapeHtml(category.description)}</p>
        </div>
      </div>
    </button>
  `;
}

function renderMidSelectionRow(majorCategory, materials) {
  const cards = majorCategory.midCategories
    .map((midCategory) => {
      const isActive = midCategory.id === activeMidCategoryId;
      const count = midCategory.subCategories.reduce((sum, subCategory) => sum + getSubCategoryCount(materials, subCategory.name), 0);
      return `
        <button class="mid-select-card ${isActive ? "active" : ""}" type="button" data-action="select-mid" data-mid-id="${midCategory.id}" style="--mid-dot: ${midCategory.color}">
          <span class="mid-dot" aria-hidden="true"></span>
          <strong>${escapeHtml(midCategory.name)} <span class="mid-inline-count">${count}개 자료</span></strong>
        </button>
      `;
    })
    .join("");

  return `
    <div class="mid-selection-grid">
      ${cards}
    </div>
  `;
}

function renderSubCategoryList(majorCategory, midCategory, materials, normalizedSearch) {
  if (!midCategory) return "";

  const filteredSubCategories = midCategory.subCategories.filter((subCategory) => !normalizedSearch || normalizeSearchText(subCategory.name).includes(normalizedSearch));
  const visibleActiveSubCategory = filteredSubCategories.find((subCategory) => subCategory.name === activeSubCategoryName);
  const selectedSubCategory = visibleActiveSubCategory || filteredSubCategories[0] || null;
  const firstCategoryId = getSubCategoryId(selectedSubCategory?.name || midCategory.subCategories[0].name);
  const rows = filteredSubCategories.length
    ? filteredSubCategories.map((subCategory, index) => renderSubCategoryRow(subCategory, midCategory, materials, index)).join("")
    : `<div class="empty-category compact-empty">검색 결과가 없습니다</div>`;
  const selectedPanel = selectedSubCategory ? renderSelectedSubCategoryMaterials(selectedSubCategory, materials) : "";

  return `
    <section class="subcategory-list-panel" style="--mid-dot: ${midCategory.color}">
      <div class="subcategory-list-actions">
        <button class="secondary-button compact-action" type="button" data-action="add-subcategory-material" data-category-id="${firstCategoryId}">자료 추가</button>
      </div>
      <div class="subcategory-row-list">${rows}</div>
      ${selectedPanel}
    </section>
  `;
}

function renderSubCategoryRow(subCategory, midCategory, materials, index) {
  const categoryId = getSubCategoryId(subCategory.name);
  const categoryMaterials = materials.filter((material) => material.categoryId === categoryId);
  const isActive = subCategory.name === activeSubCategoryName;

  return `
    <div class="subcategory-card ${isActive ? "active" : ""}" role="button" tabindex="0" data-action="select-subcategory" data-subcategory-name="${escapeHtml(subCategory.name)}" data-category-id="${categoryId}">
      <div class="subcategory-info">
        <span class="row-number">${index + 1}</span>
        <div>
          <strong>${escapeHtml(subCategory.name)}</strong>
          <p>${escapeHtml(subCategory.desc)}</p>
        </div>
      </div>
      <div class="subcategory-actions">
        <span>${categoryMaterials.length}개 자료</span>
        <button class="mini-button" type="button" data-action="register-subcategory" data-category-id="${categoryId}">등록</button>
      </div>
    </div>
  `;
}

function renderSelectedSubCategoryMaterials(subCategory, materials) {
  const categoryId = getSubCategoryId(subCategory.name);
  const categoryMaterials = materials.filter((material) => material.categoryId === categoryId);
  const selectedCount = categoryMaterials.filter((material) => selectedMaterialIds.has(material.id)).length;
  const allSelected = categoryMaterials.length > 0 && selectedCount === categoryMaterials.length;
  const selectionLabel = allSelected ? "전체 해제" : "전체 선택";
  const content = categoryMaterials.length
    ? `<div class="document-grid compact-document-grid">${categoryMaterials.map(renderMaterialCard).join("")}</div>`
    : `<div class="empty-category compact-empty">등록된 이미지가 없습니다.</div>`;

  return `
    <div class="subcategory-materials active">
      <div class="subcategory-materials-head">
        <div>
          <span class="category-label">선택 소분류</span>
          <h5>${escapeHtml(subCategory.name)}</h5>
        </div>
        <div class="subcategory-selection-actions">
          <span class="selection-count">${selectedCount}/${categoryMaterials.length}개 선택</span>
          <button class="mini-button" type="button" data-action="select-subcategory-materials" data-category-id="${categoryId}" ${categoryMaterials.length ? "" : "disabled"}>${selectionLabel}</button>
          <button class="mini-button" type="button" data-action="clear-subcategory-materials" data-category-id="${categoryId}" ${selectedCount ? "" : "disabled"}>선택 해제</button>
          <button class="mini-button" type="button" data-action="register-subcategory" data-category-id="${categoryId}">등록</button>
        </div>
      </div>
      ${content}
    </div>
  `;
}

function renderMediaMaterialCard(material) {
  const displayTitle = getReadableMaterialTitle(material);
  const displayFileName = getReadableFileName(material);
  const createdBy = getReadableUserName(material.createdBy || "기본 등록");
  const updatedBy = material.updatedBy ? `<small>수정자: ${escapeHtml(getReadableUserName(material.updatedBy))}</small>` : "";
  const isExpanded = expandedMaterialIds.has(material.id) || material.expanded;
  const isSelected = selectedMaterialIds.has(material.id);
  const links = Array.isArray(material.links) ? material.links : material.linkUrl ? [material.linkUrl] : [];
  const materialKind = getMaterialKind(material);
  const mediaType = getMaterialMediaType(material);
  const isLinkGroup = materialKind === "reference-link";
  const isLinkOnly = !material.image && links.length;
  const href = getMaterialHref(material);
  const mediaLabel = getMediaLabel(material);
  const escapedTitle = escapeHtml(displayTitle);
  const escapedHref = escapeHtml(href);
  const preview = (() => {
    if (mediaType === "video" && material.image) {
      return `<video src="${escapedHref}" controls preload="metadata" muted playsinline title="${escapedTitle}" onclick="event.preventDefault(); event.stopPropagation();"></video>`;
    }
    if (mediaType === "pdf" && material.image) {
      return `<div class="file-preview pdf-preview"><span>PDF</span><strong>${escapedTitle}</strong><small>${escapeHtml(displayFileName || "PDF 파일")}</small></div>`;
    }
    if (mediaType === "image" && material.image) {
      return `<img src="${escapedHref}" alt="${escapedTitle}" loading="lazy" />`;
    }
    return `<div class="link-preview"><span>↗</span><strong>링크 묶음</strong><small>${links.length}개 링크</small></div>`;
  })();
  const actionButtons = isLinkOnly
    ? `
          ${links.length === 1 ? `<a class="mini-button" href="${escapeHtml(links[0])}" target="_blank" rel="noreferrer">링크 열기</a>` : ""}
          <button class="mini-button" type="button" data-action="copy-link" data-material-id="${material.id}">링크 복사</button>
      `
    : `
          <button class="mini-button" type="button" data-action="toggle-image" data-material-id="${material.id}">${isExpanded ? "접기" : "펼쳐보기"}</button>
          <a class="mini-button" href="${escapedHref}" target="_blank" rel="noreferrer">${mediaType === "pdf" ? "PDF 보기" : "보기"}</a>
          <button class="mini-button" type="button" data-action="download-image" data-material-id="${material.id}">다운로드</button>
          <button class="mini-button" type="button" data-action="copy-image" data-material-id="${material.id}">복사</button>
          ${material.linkUrl ? `<a class="mini-button" href="${escapeHtml(material.linkUrl)}" target="_blank" rel="noreferrer">링크 열기</a>` : ""}
      `;

  return `
    <article class="document-card ${isExpanded ? "expanded" : ""} ${isSelected ? "selected" : ""}" data-material-id="${material.id}" data-media-type="${mediaType}">
      <label class="material-check" title="자료 선택">
        <input type="checkbox" data-action="select-material" data-material-id="${material.id}" ${isSelected ? "checked" : ""} />
        <span></span>
      </label>
      <a class="document-preview" href="${escapedHref}" target="_blank" rel="noreferrer">
        ${preview}
      </a>
      <div class="document-meta">
        <span class="media-type-badge">${mediaLabel}</span>
        <h5 title="${escapedTitle}">${escapedTitle}</h5>
        ${displayFileName && !isLinkGroup ? `<p class="file-name">${escapeHtml(displayFileName)}</p>` : ""}
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

function renderMaterialCard(material) {
  return renderMediaMaterialCard(material);
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
        <h5 title="${escapeHtml(material.title)}">${escapeHtml(material.title)}</h5>
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
  const previousScrollY = window.scrollY;
  if (!materialState.loaded) {
    materialsLibrary.innerHTML = `<section class="material-vault-section hierarchy-vault-section"><div class="compact-empty">영업자료를 불러오는 중입니다.</div></section>`;
    return;
  }
  renderMaterials();
  requestAnimationFrame(() => {
    window.scrollTo({ top: previousScrollY, left: 0, behavior: "auto" });
  });
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

function renderSalesTextDashboard() {
  const activeGroup = salesTextGroups.find((group) => group.id === activeSalesTextGroup) || salesTextGroups[0];
  const rows = activeGroup.rows;

  salesTextTabs.innerHTML = salesTextGroups
    .map(
      (group) => `
        <button class="sales-text-tab ${group.id === activeGroup.id ? "active" : ""}" type="button" data-sales-text-group="${group.id}">
          <strong>${group.title}</strong>
          <small>${group.rows.length}개 항목</small>
        </button>
      `,
    )
    .join("");

  salesTextContent.innerHTML = `
    <section class="sales-text-panel ${activeGroup.accent}">
      <div class="sales-text-panel-head">
        <div>
          <h4>${activeGroup.title}</h4>
          <p>${activeGroup.description}</p>
        </div>
        <strong>${rows.length}개 표시</strong>
      </div>
      <div class="sales-text-table-wrap">
        <table class="sales-text-table">
          <thead>
            <tr>
              <th>대분류</th>
              <th>중분류</th>
              <th>소분류</th>
              <th>실행사</th>
              <th>상품</th>
              <th>단가</th>
              <th>구동/수량</th>
              <th>환불/AS</th>
              <th>영업 메모</th>
            </tr>
          </thead>
          <tbody>
            ${
              rows.length
                ? rows.map(renderSalesTextRow).join("")
                : `<tr><td colspan="9" class="empty-table-cell">검색 결과가 없습니다.</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </section>
  `;
  salesTextContent.classList.remove("is-switching");
  void salesTextContent.offsetWidth;
  salesTextContent.classList.add("is-switching");
  window.setTimeout(() => salesTextContent.classList.remove("is-switching"), 680);
}

function renderSalesTextRow(row) {
  return `
    <tr>
      <td><span class="major-chip">${escapeHtml(row.major)}</span></td>
      <td>${escapeHtml(row.middle)}</td>
      <td>${escapeHtml(row.small)}</td>
      <td><strong>${escapeHtml(row.executor)}</strong></td>
      <td>${escapeHtml(row.product)}</td>
      <td>${escapeHtml(row.price)}</td>
      <td>${escapeHtml(row.operation)}</td>
      <td>${escapeHtml(row.refund)}</td>
      <td>${escapeHtml(row.memo)}</td>
    </tr>
  `;
}

function getActiveTextMajorCategory() {
  const categories = getSalesTextCategories();
  return categories.find((category) => category.id === activeTextMajorCategoryId) || categories[0];
}

function getActiveTextMidCategory(majorCategory = getActiveTextMajorCategory()) {
  if (!majorCategory.hasMid) return null;
  return majorCategory.midCategories.find((category) => category.id === activeTextMidCategoryId) || majorCategory.midCategories[0];
}

function getSalesTextCategories() {
  const themes = ["price-guide", "reference-image", "reference-link"];
  const icons = ["₩", "T", "※"];

  return salesTextGroups.map((group, groupIndex) => {
    const midMap = new Map();

    group.rows.forEach((row) => {
      const midName = row.middle || "기본";
      const subName = row.small || row.product || "기본";
      const midId = `${group.id}-${normalizeSearchText(midName) || midMap.size}`;

      if (!midMap.has(midName)) {
        midMap.set(midName, {
          id: midId,
          name: midName,
          color: Object.values(materialMidDotColors)[groupIndex % Object.values(materialMidDotColors).length],
          subCategories: [],
        });
      }

      const midCategory = midMap.get(midName);
      if (!midCategory.subCategories.some((subCategory) => subCategory.name === subName)) {
        midCategory.subCategories.push({
          name: subName,
          desc: row.product || row.executor || group.description,
        });
      }
    });

    return {
      id: group.id,
      theme: themes[groupIndex % themes.length],
      icon: icons[groupIndex % icons.length],
      name: group.title,
      description: group.description,
      hasMid: true,
      midCategories: Array.from(midMap.values()),
    };
  });
}

function findTextSubCategoryMatch(searchTerm) {
  const normalizedSearch = normalizeSearchText(searchTerm);
  if (!normalizedSearch) return null;

  for (const majorCategory of getSalesTextCategories()) {
    for (const midCategory of majorCategory.midCategories) {
      const subCategory = midCategory.subCategories.find((item) => normalizeSearchText(item.name).includes(normalizedSearch));
      if (subCategory) return { majorCategory, midCategory, subCategory };
    }
  }

  return null;
}

function getSalesTextRowsForSubCategory(subCategoryName) {
  const group = salesTextGroups.find((item) => item.id === activeTextMajorCategoryId);
  const activeMid = getActiveTextMidCategory();
  return (group?.rows || []).filter((row) => row.middle === activeMid?.name && (row.small || row.product || "기본") === subCategoryName);
}

function getSalesTextSubCategoryCount(subCategoryName) {
  return getSalesTextRowsForSubCategory(subCategoryName).length;
}

function renderSalesTextMajorCard(category) {
  const isActive = category.id === activeTextMajorCategoryId;
  const itemCount = salesTextGroups.find((group) => group.id === category.id)?.rows.length || 0;

  return `
    <button class="major-select-card ${isActive ? "active" : ""}" type="button" data-action="select-text-major" data-major-id="${category.id}" data-major-theme="${category.theme}">
      <div class="major-select-main">
        <span class="major-icon" aria-hidden="true">${category.icon || "T"}</span>
        <div>
          <strong>${escapeHtml(category.name)} <span class="major-inline-count">${itemCount}개 항목</span></strong>
          <p>${escapeHtml(category.description)}</p>
        </div>
      </div>
    </button>
  `;
}

function renderSalesTextMidRow(majorCategory) {
  const cards = majorCategory.midCategories
    .map((midCategory) => {
      const isActive = midCategory.id === activeTextMidCategoryId;
      const count = midCategory.subCategories.reduce((sum, subCategory) => sum + getSalesTextSubCategoryCount(subCategory.name), 0);
      return `
        <button class="mid-select-card ${isActive ? "active" : ""}" type="button" data-action="select-text-mid" data-mid-id="${midCategory.id}" style="--mid-dot: ${midCategory.color}">
          <span class="mid-dot" aria-hidden="true"></span>
          <strong>${escapeHtml(midCategory.name)} <span class="mid-inline-count">${count}개 항목</span></strong>
        </button>
      `;
    })
    .join("");

  return `<div class="mid-selection-grid">${cards}</div>`;
}

function renderSalesTextSubCategoryCard(subCategory, midCategory, index) {
  const count = getSalesTextSubCategoryCount(subCategory.name);
  const isActive = activeTextSubCategoryName === subCategory.name;

  return `
    <div class="subcategory-card ${isActive ? "active" : ""}" role="button" tabindex="0" data-action="select-text-subcategory" data-subcategory-name="${escapeHtml(subCategory.name)}">
      <div class="subcategory-info">
        <span class="row-number">${index + 1}</span>
        <div>
          <strong>${escapeHtml(subCategory.name)}</strong>
          <p>${escapeHtml(subCategory.desc)}</p>
        </div>
      </div>
      <div class="subcategory-actions">
        <span>${count}개 항목</span>
      </div>
    </div>
  `;
}

function renderSelectedSalesTextSubCategory(subCategory) {
  const rows = getSalesTextRowsForSubCategory(subCategory.name);
  const content = rows.length
    ? `
      <div class="sales-text-table-wrap compact-sales-text-table">
        <table class="sales-text-table">
          <thead>
            <tr>
              <th>대분류</th>
              <th>중분류</th>
              <th>소분류</th>
              <th>실행사</th>
              <th>상품</th>
              <th>단가</th>
              <th>구동/수량</th>
              <th>환불/AS</th>
              <th>영업 메모</th>
            </tr>
          </thead>
          <tbody>${rows.map(renderSalesTextRow).join("")}</tbody>
        </table>
      </div>
    `
    : `<div class="empty-category compact-empty">등록된 텍스트 항목이 없습니다.</div>`;

  return `
    <div class="subcategory-materials active sales-text-selected-panel">
      <div class="subcategory-materials-head">
        <div>
          <span class="category-label">선택 소분류</span>
          <h5>${escapeHtml(subCategory.name)}</h5>
        </div>
        <span class="selection-count">${rows.length}개 항목</span>
      </div>
      ${content}
    </div>
  `;
}

function renderSalesTextSubCategoryList(majorCategory, midCategory, normalizedSearch) {
  if (!midCategory) return "";

  const filteredSubCategories = midCategory.subCategories.filter((subCategory) => !normalizedSearch || normalizeSearchText(subCategory.name).includes(normalizedSearch));
  const visibleActiveSubCategory = filteredSubCategories.find((subCategory) => subCategory.name === activeTextSubCategoryName);
  const selectedSubCategory = visibleActiveSubCategory || filteredSubCategories[0] || null;
  const rows = filteredSubCategories.length
    ? filteredSubCategories.map((subCategory, index) => renderSalesTextSubCategoryCard(subCategory, midCategory, index)).join("")
    : `<div class="empty-category compact-empty">검색 결과가 없습니다</div>`;
  const selectedPanel = selectedSubCategory ? renderSelectedSalesTextSubCategory(selectedSubCategory) : "";

  return `
    <section class="subcategory-list-panel sales-text-category-panel" style="--mid-dot: ${midCategory.color}">
      <div class="subcategory-row-list">${rows}</div>
      ${selectedPanel}
    </section>
  `;
}

function renderSalesTextDashboard() {
  const textCategories = getSalesTextCategories();
  if (!activeTextMajorCategoryId || !textCategories.some((category) => category.id === activeTextMajorCategoryId)) {
    activeTextMajorCategoryId = textCategories[0]?.id || "";
  }
  const activeMajor = getActiveTextMajorCategory();
  if (!activeTextMidCategoryId || !activeMajor.midCategories.some((category) => category.id === activeTextMidCategoryId)) {
    activeTextMidCategoryId = activeMajor.midCategories[0]?.id || "";
  }
  const activeMid = getActiveTextMidCategory(activeMajor);
  if (!activeTextSubCategoryName || !activeMid?.subCategories.some((category) => category.name === activeTextSubCategoryName)) {
    activeTextSubCategoryName = activeMid?.subCategories[0]?.name || "";
  }
  const normalizedSearch = normalizeSearchText(salesTextSearchTerm);
  const majorCards = textCategories.map(renderSalesTextMajorCard).join("");
  const midCards = renderSalesTextMidRow(activeMajor);
  const subList = renderSalesTextSubCategoryList(activeMajor, activeMid, normalizedSearch);

  salesTextTabs.innerHTML = "";
  salesTextContent.innerHTML = `
    <section class="material-vault-section hierarchy-vault-section sales-text-vault">
      <div class="material-page-head">
        <h3>영업자료 (텍스트)</h3>
        <label class="material-search fixed-search">
          <span>소분류 검색</span>
          <input id="salesTextCategorySearch" type="search" value="${escapeHtml(salesTextSearchTerm)}" placeholder="예: 블로그, 영수증" autocomplete="off" />
        </label>
      </div>
      <div class="major-selection-grid">${majorCards}</div>
      ${midCards}
      ${subList}
    </section>
  `;
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
  materialFiles.accept = "image/*,video/mp4,video/webm,video/quicktime,.mov,application/pdf,.pdf";
  materialFilesLabel.classList.toggle("hidden", isReferenceLink);
  if (materialFilesLabel?.childNodes?.[0]) {
    materialFilesLabel.childNodes[0].textContent = "미디어 파일";
  }
  materialLink.required = isReferenceLink && !editingMaterialId;
  materialLinkLabel.classList.toggle("hidden", !isReferenceLink);
  editMaterialNote.classList.toggle("hidden", !editingMaterialId);
}

function updateMaterialFileStatus() {
  if (!materialFileStatus) return;
  const files = Array.from(materialFiles.files || []);
  if (!files.length) {
    materialFileStatus.textContent = "선택된 파일 없음";
    materialFileStatus.title = "";
    return;
  }

  const fileNames = files.map((file) => file.name);
  materialFileStatus.textContent = files.length === 1 ? fileNames[0] : `${files.length}개 파일 선택됨: ${fileNames[0]}`;
  materialFileStatus.title = fileNames.join("\n");
}

function resetMaterialFileStatus() {
  if (materialFiles) materialFiles.value = "";
  updateMaterialFileStatus();
}

function openMaterialModal(kind = "pricing", categoryId = "") {
  editingMaterialId = null;
  currentMaterialKind = kind;
  activeMaterialVault = kind;
  renderSalesLibrary();
  materialForm.reset();
  resetMaterialFileStatus();
  if (categoryId) materialCategory.value = categoryId;
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
  resetMaterialFileStatus();
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
    if (materialFileStatus) materialFileStatus.textContent = "이미지 파일을 먼저 선택해 주세요";
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
        mimeType: replacementFile ? replacementFile.type : currentMaterial.mimeType,
        mediaType: replacementFile ? getFileMediaType(replacementFile) : getMaterialMediaType(currentMaterial),
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
          mimeType: file.type,
          mediaType: getFileMediaType(file),
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
  const mediaType = getMaterialMediaType(material);
  if (mediaType !== "image") {
    const didCopyUrl = await copyTextToClipboard(new URL(material.image, window.location.href).href);
    showToast(didCopyUrl ? `${getMediaLabel(material)} 주소를 복사했습니다.` : "이 브라우저에서는 복사를 지원하지 않습니다.");
    return;
  }

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

function setSubCategoryMaterialSelection(categoryId, mode = "toggle") {
  const categoryMaterials = getActiveVaultMaterials().filter((material) => material.categoryId === categoryId);
  const allSelected = categoryMaterials.length > 0 && categoryMaterials.every((material) => selectedMaterialIds.has(material.id));
  const shouldSelect = mode === "clear" ? false : !allSelected;

  categoryMaterials.forEach((material) => {
    if (shouldSelect) {
      selectedMaterialIds.add(material.id);
    } else {
      selectedMaterialIds.delete(material.id);
    }
  });

  renderSalesLibrary();
}

function updateMaterialSearch(value, immediate = false) {
  materialSearchTerm = value;
  const match = findSubCategoryMatchInMajor(getActiveMajorCategory(), value);
  if (match) {
    activeMidCategoryId = match.midCategory.id;
    activeSubCategoryName = match.subCategory.name;
  }
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

function updateSalesTextSearch(value, immediate = false) {
  salesTextSearchTerm = value;
  const match = findTextSubCategoryMatch(value);
  if (match) {
    activeTextMajorCategoryId = match.majorCategory.id;
    activeTextMidCategoryId = match.midCategory.id;
    activeTextSubCategoryName = match.subCategory.name;
  }
  window.clearTimeout(materialSearchTimer);

  const renderSearch = () => {
    renderSalesTextDashboard();
    requestAnimationFrame(() => {
      const searchInput = document.querySelector("#salesTextCategorySearch");
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

  materialSearchTimer = window.setTimeout(renderSearch, 180);
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
  const majorSelection = event.target.closest("[data-action='select-major']");
  if (majorSelection) {
    const majorCategory = CATEGORIES.find((category) => category.id === majorSelection.dataset.majorId);
    if (!majorCategory) return;
    activeMajorCategoryId = majorCategory.id;
    activeMaterialVault = getMajorMaterialKind(majorCategory);
    if (majorCategory.hasMid) {
      activeMidCategoryId = majorCategory.midCategories[0].id;
      activeSubCategoryName = majorCategory.midCategories[0].subCategories[0].name;
    }
    renderSalesLibrary();
    return;
  }

  const midSelection = event.target.closest("[data-action='select-mid']");
  if (midSelection) {
    activeMidCategoryId = midSelection.dataset.midId;
    const majorCategory = getActiveMajorCategory();
    const midCategory = getActiveMidCategory(majorCategory);
    activeSubCategoryName = midCategory?.subCategories[0]?.name || activeSubCategoryName;
    renderSalesLibrary();
    return;
  }

  const subCategorySelection = event.target.closest("[data-action='select-subcategory']");
  if (subCategorySelection) {
    if (!event.target.closest("[data-action='register-subcategory']")) {
      activeSubCategoryName = subCategorySelection.dataset.subcategoryName;
      renderSalesLibrary();
      return;
    }
  }

  const registerButton = event.target.closest("[data-action='register-subcategory'], [data-action='add-subcategory-material']");
  if (registerButton) {
    event.preventDefault();
    event.stopPropagation();
    openMaterialModal(activeMaterialVault, registerButton.dataset.categoryId);
    return;
  }

  const majorToggle = event.target.closest("[data-action='toggle-major']");
  if (majorToggle) {
    const previousScrollY = window.scrollY;
    const card = majorToggle.closest(".major-category-card");
    const majorKey = `major:${card.dataset.majorId}`;
    const body = card.querySelector(".major-category-body");
    const isCollapsed = body.classList.toggle("collapsed");
    majorToggle.setAttribute("aria-expanded", String(!isCollapsed));
    majorToggle.querySelector(".chevron")?.classList.toggle("open", !isCollapsed);
    if (isCollapsed) collapsedMaterialGroupIds.add(majorKey);
    else collapsedMaterialGroupIds.delete(majorKey);
    requestAnimationFrame(() => {
      window.scrollTo({ top: previousScrollY, left: 0, behavior: "auto" });
    });
    return;
  }

  const midToggle = event.target.closest("[data-action='toggle-mid']");
  if (midToggle) {
    const previousScrollY = window.scrollY;
    const midCard = midToggle.closest(".mid-category-card");
    const majorCard = midToggle.closest(".major-category-card");
    const midKey = `mid:${majorCard.dataset.majorId}:${midCard.dataset.midId}`;
    const body = midCard.querySelector(".mid-category-body");
    const isCollapsed = body.classList.toggle("collapsed");
    midToggle.setAttribute("aria-expanded", String(!isCollapsed));
    midToggle.querySelector(".chevron")?.classList.toggle("open", !isCollapsed);
    if (isCollapsed) collapsedMaterialGroupIds.add(midKey);
    else collapsedMaterialGroupIds.delete(midKey);
    requestAnimationFrame(() => {
      window.scrollTo({ top: previousScrollY, left: 0, behavior: "auto" });
    });
    return;
  }

  const categorySelection = event.target.closest("[data-action='select-category-materials']");
  if (categorySelection) {
    event.preventDefault();
    event.stopPropagation();
    toggleCategoryMaterialSelection(categorySelection.dataset.categoryId);
    return;
  }

  const categoryToggle = event.target.closest("[data-action='toggle-category']");
  if (categoryToggle) {
    const previousScrollY = window.scrollY;
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
    requestAnimationFrame(() => {
      window.scrollTo({ top: previousScrollY, left: 0, behavior: "auto" });
    });
    return;
  }

  const selectionInput = event.target.closest("[data-action='select-material']");
  if (selectionInput) {
    toggleMaterialSelection(selectionInput.dataset.materialId, selectionInput.checked);
    return;
  }

  const bulkAction = event.target.closest("[data-action='select-visible-materials'], [data-action='download-selected-materials'], [data-action='copy-selected-materials'], [data-action='select-subcategory-materials'], [data-action='clear-subcategory-materials']");
  if (bulkAction) {
    if (bulkAction.dataset.action === "select-visible-materials") toggleVisibleMaterialSelection();
    if (bulkAction.dataset.action === "download-selected-materials") downloadSelectedMaterials();
    if (bulkAction.dataset.action === "copy-selected-materials") copySelectedMaterials();
    if (bulkAction.dataset.action === "select-subcategory-materials") setSubCategoryMaterialSelection(bulkAction.dataset.categoryId);
    if (bulkAction.dataset.action === "clear-subcategory-materials") setSubCategoryMaterialSelection(bulkAction.dataset.categoryId, "clear");
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

function handleSalesTextClick(event) {
  const majorSelection = event.target.closest("[data-action='select-text-major']");
  if (majorSelection) {
    const majorCategory = getSalesTextCategories().find((category) => category.id === majorSelection.dataset.majorId);
    if (!majorCategory) return;
    activeTextMajorCategoryId = majorCategory.id;
    activeTextMidCategoryId = majorCategory.midCategories[0].id;
    activeTextSubCategoryName = majorCategory.midCategories[0].subCategories[0].name;
    renderSalesTextDashboard();
    return;
  }

  const midSelection = event.target.closest("[data-action='select-text-mid']");
  if (midSelection) {
    activeTextMidCategoryId = midSelection.dataset.midId;
    const midCategory = getActiveTextMidCategory();
    activeTextSubCategoryName = midCategory?.subCategories[0]?.name || activeTextSubCategoryName;
    renderSalesTextDashboard();
    return;
  }

  const subCategorySelection = event.target.closest("[data-action='select-text-subcategory']");
  if (subCategorySelection) {
    activeTextSubCategoryName = subCategorySelection.dataset.subcategoryName;
    renderSalesTextDashboard();
  }
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
  applyMediaNaming();
  inboundPage.classList.toggle("hidden", page !== "inbound");
  salesPage.classList.toggle("hidden", page !== "sales");
  textSalesPage.classList.toggle("hidden", page !== "text-sales");
  clientsPage.classList.toggle("hidden", page !== "clients");
  settlementPage.classList.toggle("hidden", page !== "settlement");
  clientSubnav.classList.toggle("collapsed", !clientSubnavExpanded);
  const visiblePage = {
    inbound: inboundPage,
    sales: salesPage,
    "text-sales": textSalesPage,
    clients: clientsPage,
    settlement: settlementPage,
  }[page];
  animatePageEntry(visiblePage);

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.page === page);
  });

  if (page === "text-sales") {
    renderSalesTextDashboard();
  }

  if (page === "sales") {
    renderSalesLibrary();
    ensureMaterialStateLoaded().then(() => {
      if (currentPage === "sales") renderSalesLibrary();
    });
  }

  if (page === "inbound") {
    renderInboundLeads();
  }

  if (page === "clients" && !isSameClientClick) {
    renderClients();
  }
}

function isMatchingPassword(user, password) {
  const normalizedPassword = String(password || "").trim();
  return user.password === normalizedPassword || user.passwordAliases?.includes(normalizedPassword);
}

function isMatchingUserId(user, userId) {
  const normalizedInput = String(userId || "").trim().toLowerCase();
  const ids = [user.id, ...(user.idAliases || [])].map((id) => String(id).trim().toLowerCase());
  return ids.includes(normalizedInput);
}

function findLoginUser(userId, password) {
  const loginPools = [users, guaranteedLoginUsers];
  for (const pool of loginPools) {
    const foundUser = pool.find((item) => isMatchingUserId(item, userId) && isMatchingPassword(item, password));
    if (foundUser) return foundUser;
  }
  return null;
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
  const user = findLoginUser(userId, password);

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

openMaterialModalButton?.addEventListener("click", () => openMaterialModal("pricing"));
openReferenceMaterialModalButton?.addEventListener("click", () => openMaterialModal("reference-image"));
openReferenceLinkModalButton?.addEventListener("click", () => openMaterialModal("reference-link"));
closeMaterialModalButton.addEventListener("click", closeMaterialModal);
cancelMaterialModalButton.addEventListener("click", closeMaterialModal);
materialModal.addEventListener("click", (event) => {
  if (event.target === materialModal) closeMaterialModal();
});
materialFilePickerButton?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  materialFiles.click();
});
materialFiles?.addEventListener("change", updateMaterialFileStatus);
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

salesTextTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-sales-text-group]");
  if (!button) return;
  activeSalesTextGroup = button.dataset.salesTextGroup;
  renderSalesTextDashboard();
});
salesTextContent.addEventListener("click", handleSalesTextClick);
salesTextContent.addEventListener("compositionstart", (event) => {
  if (event.target.id === "salesTextCategorySearch") salesTextSearchComposing = true;
});
salesTextContent.addEventListener("compositionend", (event) => {
  if (event.target.id === "salesTextCategorySearch") {
    salesTextSearchComposing = false;
    updateSalesTextSearch(event.target.value, true);
  }
});
salesTextContent.addEventListener("input", (event) => {
  if (event.target.id === "salesTextCategorySearch" && !salesTextSearchComposing) {
    updateSalesTextSearch(event.target.value);
  }
});

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
const landingFrame = document.querySelector("#landingFrame");
const isLocalPreviewHost = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
document.body.classList.toggle("production-domain", !isLocalPreviewHost);

if (!isLocalPreviewHost) {
  document.querySelector(".preview-topbar")?.remove();
  landingFrame?.removeAttribute("src");
  landingPreview?.remove();
}

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

  if (isLanding && landingFrame && !landingFrame.src) {
    landingFrame.src = landingFrame.dataset.src;
  }
  appShell.classList.toggle("hidden", isLanding);
  landingPreview.classList.toggle("hidden", !isLanding);
  previewSectionButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.previewSection === section);
  });
}

if (isLocalPreviewHost) {
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
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a, [role='button']");
  if (!target || target.hasAttribute("disabled") || target.getAttribute("aria-disabled") === "true") return;
  pulseInteraction(target);
});

async function initializeApp() {
  renderCategoryOptions();
  applyMediaNaming();
}

initializeApp();
