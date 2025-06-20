// 圖片切換邏輯start.....................

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
// 以上為圖片切換邏輯end.................


// 加減產品數量的運算 start..............

let reduceBtn = document.querySelector(".reduce");
let addBtn = document.querySelector('.add');
let input = document.querySelector(".nowNumber");
let notice = document.querySelector(".stockNotice");

let minValue = 1;
let stockAttr = input.dataset.stock;
let maxValue = (stockAttr !== undefined && !isNaN(parseInt(stockAttr))) ? parseInt(stockAttr) : 0;

// 判斷是否為缺貨

if (maxValue === 0) {
    // 顯示補貨中文字
    notice.textContent = "售完補貨中!";
    // 停用加減按鈕和輸入框
    addBtn.disabled = true;
    reduceBtn.disabled = true;
    input.readOnly = true;
    input.classList.add("disabled");
    addBtn.classList.add("disabled");
    reduceBtn.classList.add("disabled");
    input.value = 0;

} else {
    notice.textContent = `(庫存: ${maxValue} 包)`;
    input.value = minValue;
}

// 數量正常的加法

addBtn.addEventListener("click", () => {
    let value = parseInt(input.value) || minValue;
    if (value < maxValue) {
        input.value = value + 1;
    }
});

// 數量正常的減法

reduceBtn.addEventListener("click", () => {
    let value = parseInt(input.value) || minValue;
    if (value > minValue) {
        input.value = value - 1;
    }
});

// 限制只輸入數字

input.addEventListener("input", () => {
    let value = input.value;

    if (!/^[1-9]\d*$/.test(value)) {
        input.value = "";
        return;
    }

    let num = parseInt(value);
    if (num > maxValue) {
        input.value = maxValue;
    }
});

// 防止使用者刪除後變成空白，因此要恢復預設值

input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
        input.value = minValue;
    }
})

// 加減產品數量的運算 end.............................


// 加入購物車icon的數量start...........................




//加入購物車icon的數量end
