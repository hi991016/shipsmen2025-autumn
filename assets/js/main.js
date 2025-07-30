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

// ===== popup =====
// # close
const navigaiton = document.querySelector("[data-side-right");
const closePopupAll = () => {
  navigaiton.classList.remove("--hide");
  const popups = document.querySelectorAll("[data-popup]");
  const itemCredits = document.querySelectorAll("[data-items]");
  itemCredits.forEach((item) => {
    item.style.opacity = "1";
    item.nextElementSibling.style.opacity = "1";
  });
  popups.forEach((item) => {
    item.classList.remove("--show");
  });
};

// # show
const itemElements = document.querySelectorAll("[data-items]");
itemElements.forEach((itemElement) => {
  itemElement.addEventListener("click", () => {
    closePopupAll();
    const slide = itemElement.closest(".swiper-slide");
    const popupElement = slide.querySelector("[data-popup]");

    if (popupElement) {
      itemElement.style.opacity = "0";
      itemElement.nextElementSibling.style.opacity = "0";
      navigaiton.classList.add("--hide");
      popupElement.classList.add("--show");
    }
  });
});

// ===== swiper =====
const [btnShipsEnter, btnShipsPrev, btnCampaignPrev, fadeIn] = [
  document.querySelector("[data-ships-enter]"),
  document.querySelector("[data-ships-prev]"),
  document.querySelector("[data-campaign-prev]"),
  document.querySelectorAll("[data-fade]"),
];

// # ships
const shipsSwiper = new Swiper("[data-ships-swiper]", {
  navigation: {
    nextEl: null,
    prevEl: null,
  },
  slidesPerView: 1,
  slidesPerGroup: 1,
  speed: 1200,
  allowTouchMove: false,
  on: {
    slideChange: (sw) => {
      fadeIn.forEach((item) => {
        item.classList.toggle("--hide", sw.realIndex !== 1);
      });
    },
  },
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
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
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
  on: {
    init: (sw) => {
      fadeIn.forEach((item) => {
        item.classList.toggle("--hide", sw.realIndex === 0);
      });
    },
    slideChange: (sw) => {
      btnCampaignPrev.style.display = sw.realIndex === 0 ? "none" : "block";
      btnShipsPrev.style.display = sw.realIndex === 0 ? "block" : "none";
    },
  },
});

//
const adjustLayout = () => {
  if (isMobile.matches) return;

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
  const imageAspectRatio = 578 / 719; // original image ratio

  // calculate swiper size based on desired ratio at 1440x779
  const targetWidth = 1156; // 1440 - 2*142
  const targetHeight = 719; // 779 - 2*30

  // calculate the required percentage
  const widthRatio = targetWidth / 1440;
  const heightRatio = targetHeight / 779;

  // apply ratio to current viewport
  const desiredSwiperWidth = browserWidth * widthRatio;
  const desiredSwiperHeight = browserHeight * heightRatio;

  // calculate actual size based on image aspect ratio constraint
  let swiperWidth = desiredSwiperWidth;
  let swiperHeight = swiperWidth / 2 / imageAspectRatio;

  // check height constraint
  if (swiperHeight > desiredSwiperHeight) {
    swiperHeight = desiredSwiperHeight;
    swiperWidth = swiperHeight * 2 * imageAspectRatio;
  }

  // calculate sidebar from calculated swiper size
  const horizontalSidebarWidth = (browserWidth - swiperWidth) / 2;
  const verticalSidebarHeight = (browserHeight - swiperHeight) / 2;

  // apply size for sidebar
  topSidebar.style.height = `${verticalSidebarHeight}px`;
  bottomSidebar.style.height = `${verticalSidebarHeight}px`;
  leftSidebar.style.width = `${horizontalSidebarWidth}px`;
  rightSidebar.style.width = `${horizontalSidebarWidth}px`;
  swiperContainer.style.width = `${swiperWidth}px`;
  console.log('swiperWidth', swiperWidth)
  swiperContainer.style.height = `${swiperHeight}px`;

  // update swiper after resizing
  campaignSwiper.update();

  // fuck, mệt vl
};
adjustLayout();
window.addEventListener("resize", adjustLayout);

// ===== event swiper =====
btnShipsEnter?.addEventListener("click", () => {
  shipsSwiper.slideNext();
});

btnShipsPrev?.addEventListener("click", () => {
  shipsSwiper.slidePrev();
});

// ### ===== ONLOAD ===== ###
window.onload = () => {
  init();
};
