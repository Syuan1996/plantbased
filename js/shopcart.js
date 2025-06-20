//  取得購物車資料
function getCartData() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

//  更新購物車紅點（右上角）
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const cart = getCartData();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCount) {
        cartCount.textContent = totalCount;
        cartCount.style.display = totalCount > 0 ? 'inline-block' : 'none';
    }
}

//  渲染購物車商品列表
function renderCartItems() {
    const cartItems = getCartData();
    const tbody = document.querySelector('.shopItemWrap tbody');
    tbody.innerHTML = ''; // 清空原本內容

    let totalAmount = 0;

    if (cartItems.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="emptyMessage"">目前購物車是空的 !!!</td></tr>`;
        updateTotalDisplay(0); //  小計也歸零
        return;
    }

    cartItems.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        totalAmount += subtotal;

        const tr = document.createElement('tr');


        tr.innerHTML = `
            <td>
                <div><img src="${item.img}" alt=""></div>
                <h3>${item.name}</h3>
            </td>
            <td data-label="金額">${item.price}元</td>
            <td data-label="數量">
                <div class="shopNumWrap">
                    <button type="button" class="reduce" data-index="${index}">
                        <img src="img/product/productInside/reduce.svg" alt="減少">
                    </button>
                    <input type="text" value="${item.quantity}" readonly>
                    <button type="button" class="add" data-index="${index}">
                        <img src="img/product/productInside/add.svg" alt="增加">
                    </button>
                </div>
            </td>
            <td data-label="小計">
                <div class="subtotalWrap">
                    <span>${subtotal}元</span>
                    <img src="img/shopCart/garbageCan.png" alt="刪除" class="delete" data-index="${index}">
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    updateTotalDisplay(totalAmount);
}

// 計算總金額和運費
function updateTotalDisplay(totalAmount) {
    const shippingFee = totalAmount === 0 ? 0 : (totalAmount >= 1000 ? 0 : 80);
    const finalAmount = totalAmount + shippingFee;

    const tfoot = document.querySelector('.shopItemWrap tfoot');
    tfoot.innerHTML = `
        <tr>
            <td>商品總額:<span>${totalAmount}</span>元</td>
            <td>運費:<span>${shippingFee}</span>元</td>
            <td class="CheckAmount" colspan="2">結帳金額:<span>${finalAmount}</span>元</td>
        </tr>
    `;
}

//  綁定事件（點圖片也能觸發）
function bindEvents() {
    const tbody = document.querySelector('.shopItemWrap tbody');

    tbody.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.add');
        const reduceBtn = e.target.closest('.reduce');
        const deleteBtn = e.target.closest('.delete');

        let cart = getCartData();

        if (addBtn) {
            const index = addBtn.dataset.index;
            const item = cart[index];

            // 檢查是否已經達到庫存上限
            if (item.quantity < item.stock) {
                item.quantity++;
            } else {
                alert('已達庫存上限，無法再增加');
                return;
            }
        } else if (reduceBtn) {
            const index = reduceBtn.dataset.index;
            cart[index].quantity = Math.max(1, cart[index].quantity - 1);
        } else if (deleteBtn) {
            const index = deleteBtn.dataset.index;
            cart.splice(index, 1);
        } else {
            return; // 沒點到按鈕類元件就不處理
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();      // 重畫畫面
        updateCartCount();      // 更新右上角紅點
    });
}
//  初始化
function initShopCartPage() {
    renderCartItems();
    bindEvents();
    updateCartCount(); // 初始也同步紅點
}

initShopCartPage();


// =========下半部切換資料的js -地址超商 start=========


const homeDeliveryRadio = document.getElementById("homeDelivery");
const superMarketRadio = document.getElementById("superMarket");

const deliveryAddress = document.querySelector(".deliveryAddress");
const famSevWrap = document.querySelector(".famSevWrap");

// 初始狀態檢查（如果你預設宅配被選中）
toggleDeliveryFields();

homeDeliveryRadio.addEventListener("change", toggleDeliveryFields);
superMarketRadio.addEventListener("change", toggleDeliveryFields);

function toggleDeliveryFields() {
    if (homeDeliveryRadio.checked) {
        deliveryAddress.style.display = "flex";
        deliveryAddress.style.pointerEvents = "auto";
        famSevWrap.style.display = "none";
    } else if (superMarketRadio.checked) {
        deliveryAddress.style.display = "none";
        deliveryAddress.style.pointerEvents = "none";
        famSevWrap.style.display = "block";
    }
}


// =========下半部切換資料的js -地址超商 end=========




// =========下半部切換資料的js -付款方式 start=========

const creditCardRadio = document.getElementById("creditCard");
const cashArriveRadio = document.getElementById("cashArrive");
const transMoneyRadio = document.getElementById("transMoney");
const cardInfo = document.querySelector(".cardInfo");

// 預設進來根據選中的 radio 來決定要不要顯示
function togglePaymentFields() {
    if (creditCardRadio.checked) {
        cardInfo.style.display = "block";
    } else {
        cardInfo.style.display = "none";
    }
}

// 加監聽器
creditCardRadio.addEventListener("change", togglePaymentFields);
cashArriveRadio.addEventListener("change", togglePaymentFields);
transMoneyRadio.addEventListener("change", togglePaymentFields);

// 頁面一開始就執行一次，確保正確顯示
togglePaymentFields();



// =========下半部切換資料的js -付款方式 end=========



// =========下半部切換資料的js -發票類型 start=========


const phoneInvoiceRadio = document.getElementById("phoneInvoice");
const companyInvoiceRadio = document.getElementById("companyInvoice");

const phoneInvoiceWrite = document.querySelector(".phoneInvoiceWrite");
const companyInvoiceWrite = document.querySelector(".companyInvoiceWrite");

function toggleInvoiceFields() {
    if (phoneInvoiceRadio.checked) {
        phoneInvoiceWrite.style.display = "block";
        companyInvoiceWrite.style.display = "none";
    } else if (companyInvoiceRadio.checked) {
        phoneInvoiceWrite.style.display = "none";
        companyInvoiceWrite.style.display = "block";
    } else {
        // 其他像電子發票或捐贈發票，不顯示任何輸入欄位
        phoneInvoiceWrite.style.display = "none";
        companyInvoiceWrite.style.display = "none";
    }
}

// 加事件監聽
phoneInvoiceRadio.addEventListener("change", toggleInvoiceFields);
companyInvoiceRadio.addEventListener("change", toggleInvoiceFields);
document.getElementById("elecInvoice").addEventListener("change", toggleInvoiceFields);
document.getElementById("donateInvoice").addEventListener("change", toggleInvoiceFields);

// 頁面載入時執行一次
toggleInvoiceFields();


// =========下半部切換資料的js -發票類型 end=========