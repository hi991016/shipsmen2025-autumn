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
      // allowTouchMove: false,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
});

// 
const adjustLayout = () => {
  if (isMobile.matches) return

  const [
    swiperContainer,
    topSidebar,
    bottomSidebar,
    leftSidebar,
    rightSidebar,
  ] = [
    document.querySelector("[data-campaign-swiper]"),
    document.querySelector("[data-side-top]"),
    document.querySelector("[data-side-bottom"),
    document.querySelector("[data-side-left"),
    document.querySelector("[data-side-right"),
  ];

  const browserWidth = window.innerWidth;
  const browserHeight = window.innerHeight;
  const imageAspectRatio = 578 / 719; // image ratio

  // calculate maximum size for swiper based on image aspect ratio (object-fit: contain)
  const maxSwiperWidth = browserWidth * 0.9; // 90% width limit
  const maxSwiperHeight = browserHeight * 0.9; // 90% height limit
  let swiperWidth = maxSwiperWidth;
  let swiperHeight = swiperWidth / 2 / imageAspectRatio;

  if (swiperHeight > maxSwiperHeight) {
    swiperHeight = maxSwiperHeight;
    swiperWidth = swiperHeight * 2 * imageAspectRatio;
  }

  // calculate sidebar size
  const horizontalSidebarWidth = (browserWidth - swiperWidth) / 2;
  const verticalSidebarHeight = (browserHeight - swiperHeight) / 2;

  // apply size for sidebar
  topSidebar.style.height = `${verticalSidebarHeight}px`;
  bottomSidebar.style.height = `${verticalSidebarHeight}px`;
  leftSidebar.style.width = `${horizontalSidebarWidth}px`;
  rightSidebar.style.width = `${horizontalSidebarWidth}px`;
  swiperContainer.style.width = `${swiperWidth}px`;
  swiperContainer.style.height = `${swiperHeight}px`;

  // update swiper after resizing
  campaignSwiper.update();

  // fuck, mệt vl
};
adjustLayout();
window.addEventListener("resize", adjustLayout);

// ===== event swiper =====
const [btnEnter] = [document.querySelector("[data-ships-enter]")];

btnEnter?.addEventListener("click", () => {
  shipsSwiper.slideNext();
});

// ### ===== ONLOAD ===== ###
window.onload = () => {
  init();
};
