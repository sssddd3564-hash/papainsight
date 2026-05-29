(() => {
  const track = document.querySelector(".who-track");
  if (!track || track.dataset.enhanced === "true") return;

  const cards = Array.from(track.querySelectorAll(".who-card:not([aria-hidden='true'])"));
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  track.dataset.enhanced = "true";
})();

(() => {
  const rankImages = Array.from(document.querySelectorAll(".rank-image img"));
  if (!rankImages.length) return;

  const modal = document.createElement("div");
  modal.className = "rank-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "순위 이미지 크게 보기");
  modal.innerHTML = `
    <div class="rank-modal__dialog">
      <button class="rank-modal__close" type="button" aria-label="닫기">×</button>
      <img alt="">
    </div>
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector("img");
  const closeButton = modal.querySelector(".rank-modal__close");

  const close = () => {
    modal.classList.remove("is-open");
    modalImage.removeAttribute("src");
    document.body.style.overflow = "";
  };

  rankImages.forEach((image) => {
    const trigger = image.closest(".rank-image");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("role", "button");
    trigger.setAttribute("aria-label", `${image.alt} 크게 보기`);

    const open = () => {
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt;
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeButton.focus();
    };

    trigger.addEventListener("click", open);
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });

  closeButton.addEventListener("click", close);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) close();
  });
})();

(() => {
  const form = document.querySelector("[data-google-sheet-form]");
  if (!form) return;

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyRnSj8IUUZSydtXkBF_JVc_Er1dba3h7wo-aZJ8nIw0eQOg5qQYE2KwGU8ojW23Fyu/exec";
  const status = form.querySelector("[data-form-status]");
  const submitButton = form.querySelector(".form-button");
  const thanksModal = document.querySelector("[data-thanks-modal]");
  const thanksCloseButtons = Array.from(document.querySelectorAll("[data-thanks-close]"));
  const placeIdentityInputs = Array.from(form.querySelectorAll("[data-place-identity]"));

  const openThanksModal = () => {
    if (!thanksModal) return;
    thanksModal.classList.add("is-open");
    thanksModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    thanksModal.querySelector("[data-thanks-close]")?.focus();
  };

  const closeThanksModal = () => {
    if (!thanksModal) return;
    thanksModal.classList.remove("is-open");
    thanksModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  thanksCloseButtons.forEach((button) => {
    button.addEventListener("click", closeThanksModal);
  });

  thanksModal?.addEventListener("click", (event) => {
    if (event.target === thanksModal) closeThanksModal();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && thanksModal?.classList.contains("is-open")) {
      closeThanksModal();
    }
  });

  form.querySelectorAll(".consent-check input").forEach((input) => {
    input.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  const setStatus = (message, type = "") => {
    if (!status) return;
    status.textContent = message;
    status.dataset.type = type;
  };

  const validatePlaceIdentity = () => {
    const hasIdentity = placeIdentityInputs.some((input) => input.value.trim() !== "");

    placeIdentityInputs.forEach((input, index) => {
      input.setCustomValidity(hasIdentity || index !== 0 ? "" : "플레이스명 또는 플레이스 URL 중 하나를 입력해주세요.");
    });

    return hasIdentity;
  };

  placeIdentityInputs.forEach((input) => {
    input.addEventListener("input", validatePlaceIdentity);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!GOOGLE_SCRIPT_URL) {
      setStatus("신청 수신 URL이 아직 연결되지 않았습니다. 관리자에게 문의해주세요.", "error");
      return;
    }

    validatePlaceIdentity();

    if (!form.reportValidity()) {
      setStatus("이름, 전화번호, 플레이스명 또는 플레이스 URL을 입력해주세요.", "error");
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") || "",
      phone: formData.get("phone") || "",
      placeName: formData.get("placeName") || "",
      placeUrl: formData.get("placeUrl") || "",
      keyword: formData.get("keyword") || "",
      businessType: formData.get("businessType") || "",
      clientType: formData.get("clientType") || "",
      budget: formData.get("budget") || "",
      message: formData.get("message") || "",
      privacyConsent: formData.get("privacyConsent") || "",
      thirdPartyConsent: formData.get("thirdPartyConsent") || "",
      pageUrl: window.location.href,
      userAgent: window.navigator.userAgent,
    };

    submitButton.disabled = true;
    setStatus("신청 내용을 전송하고 있습니다.", "pending");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      form.reset();
      setStatus("", "");
      openThanksModal();
    } catch (error) {
      setStatus("전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.", "error");
    } finally {
      submitButton.disabled = false;
    }
  });
})();
