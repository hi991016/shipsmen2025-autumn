"use strict";

// ===== globals =====
const isMobile = window.matchMedia("(max-width: 1023px)");
const eventsTrigger = ["pageshow", "scroll"];

// ===== init =====
const init = () => {
  // #
  document.body.classList.remove("fadeout");
  // # app height
  appHeight();
  // # lazy load
  const ll = new LazyLoad({
    threshold: 0,
    elements_selector: ".lazy",
  });
};

// ===== app height =====
const appHeight = () => {
  const doc = document.documentElement;
  if (!isMobile.matches) return;
  doc.style.setProperty("--app-height", `${doc.clientHeight}px`);
};
window.addEventListener("resize", appHeight);

// ===== swiper =====

// # ships
const shipsSwiper = new Swiper("[data-ships-swiper]", {
  navigation: {
    nextEl: null,
    prevEl: null,
  },
  slidesPerView: 1,
  speed: 1200,
  allowTouchMove: false,
});

// # firstview
const fvSwiper = new Swiper("[data-fv-swiper]", {
  loop: true,
  effect: "fade",
  speed: 2000,
  allowTouchMove: false,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
});

// # campaign
const campaignSwiper = new Swiper("[data-campaign-swiper]", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  speed: 1200,
  breakpoints: {
    0: {
      allowTouchMove: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    1024: {
      allowTouchMove: false,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
});

// ===== event swiper =====
const [btnEnter] = [document.querySelector("[data-ships-enter]")];

btnEnter?.addEventListener("click", () => {
  shipsSwiper.slideNext();
});

// ### ===== ONLOAD ===== ###
window.onload = () => {
  init();
};
