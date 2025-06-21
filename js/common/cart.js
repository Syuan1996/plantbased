function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCount) {
        cartCount.textContent = totalCount;
        cartCount.style.display = totalCount > 0 ? 'inline-block' : 'none';
    }
}

function cartClickHandler() {
    const quantityInput = document.querySelector('.nowNumber');
    const stock = parseInt(quantityInput.dataset.stock || "0");
    if (stock <= 0) {
        // 按鈕已禁用，直接 return 不動作
        return;
    }

    const productName = document.querySelector('.productInsideTopRight h2').textContent;
    const productPrice = parseInt(document.querySelector('.price .Digits').textContent);
    const productQuantity = parseInt(quantityInput.value) || 1;
    const productImg = document.getElementById('largeImage').src;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(item => item.name === productName);

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += productQuantity;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: productQuantity, img: productImg, stock: stock });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function buyClickHandler() {
    const quantityInput = document.querySelector('.nowNumber');
    const stock = parseInt(quantityInput.dataset.stock || "0");
    if (stock <= 0) {
        // 按鈕已禁用，直接 return 不動作
        return;
    }
    cartClickHandler();
    window.location.href = '../shopCart.html';
}

function initProductInsidePage() {
    const quantityInput = document.querySelector('.nowNumber');
    const cartBtn = document.querySelector('.buyCart .cart');
    const buyBtn = document.querySelector('.buyCart .buy');

    if (!quantityInput || !cartBtn || !buyBtn) return;

    const stock = parseInt(quantityInput.dataset.stock || "0");

    if (stock <= 0) {
        cartBtn.disabled = true;
        buyBtn.disabled = true;
        cartBtn.classList.add('disabled');
        buyBtn.classList.add('disabled');
    } else {
        cartBtn.addEventListener('click', cartClickHandler);
        buyBtn.addEventListener('click', buyClickHandler);
        quantityInput.value = 1;
    }
}

updateCartCount();
initProductInsidePage();




// 清除購物車內容測試的函示
// localStorage.removeItem('cart');