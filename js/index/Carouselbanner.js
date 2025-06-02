const bannerSwiper = new Swiper(".swiper", {
  // Optional parameters
  //   slidesPerView: 1,
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".custom-next",
    prevEl: ".custom-prev",
  },
});

// 暫停與播放

const bannerTogglePlay = document.querySelector(".bannerTogglePlay");
const pauseIcon = document.querySelector(".pauseIcon");
const playIcon = document.querySelector(".playIcon");

let isPlaying = true;

bannerTogglePlay.addEventListener("click", () => {
  if (isPlaying) {
    bannerSwiper.autoplay.stop();
    pauseIcon.style.display = "none";
    playIcon.style.display = "inline";
  } else {
    bannerSwiper.autoplay.start();
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
  }

  isPlaying = !isPlaying;
});
