const imgs = document.querySelectorAll(".indexBrandLeftcarousel img");
const frame = document.querySelector(".indexBrandLeftFrame");

const colors = ["#f88400", "#FFB23B", "#F99A83"];

// 輪播圖一開始的照片
let nowIndex = 0;
// 輪播一開始的顏色

frame.style.borderColor = colors[nowIndex % colors.length];

imgs[nowIndex].classList.add("active");

setInterval(() => {
  // 先移出目前顯示的照片

  imgs[nowIndex].classList.remove("active");

  //   計算下一張的index

  nowIndex = (nowIndex + 1) % imgs.length;

  //   加上新照片的active開啟他
  imgs[nowIndex].classList.add("active");

  frame.style.borderColor = colors[nowIndex % colors.length];
}, 3000);
