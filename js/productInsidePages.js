function showLarge(e) {
    let clickItem = e.target;
    if (clickItem.tagName === "IMG") {
        document.getElementById("largeImage").src = clickItem.src;

        // 移除所有.press外框線
        document.querySelectorAll(".productSmall").forEach(item => {
            item.classList.remove("press");
        });

        clickItem.parentElement.classList.add("press");
    }
}

let smallImagePanel = document.getElementById("smallImagePanel");

smallImagePanel.addEventListener("click", showLarge);

// 頁面一開始預設顯示的大圖片
let firstImg = smallImagePanel.querySelector("img");

if (firstImg) {
    document.getElementById("largeImage").src = firstImg.src;

    // 頁面第一個圖片預設加框
    firstImg.parentElement.classList.add("press")
}