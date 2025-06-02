
let buttonsCategoryP = document.querySelectorAll('.productContentCatag [data-categoryp]');
let navProductCategory = document.querySelectorAll('nav.mainNav [data-categoryp]');

let productContentItems = document.querySelectorAll(".productContentItem");

function switchNavProductCategory(NPC) {
    productContentItems.forEach(item => {

        item.style.display = 'none';
        if (
            NPC === 'all' ||
            (NPC === 'vegetable' && item.classList.contains('vegItem')) ||
            (NPC === 'fruit' && item.classList.contains('fruItem')) ||
            (NPC === 'mix' && item.classList.contains('mixItem'))
        ) {
            item.style.display = 'block';
        }
    });

    // 移除所有active的狀態
    buttonsCategoryP.forEach(button => button.classList.remove('active'));
    // 找出當前點擊要加上active的按鈕
    let targetBtn = null;
    for (let i = 0; i < buttonsCategoryP.length; i++) {
        if (buttonsCategoryP[i].dataset.categoryp === NPC) {
            targetBtn = buttonsCategoryP[i];
            break;
        }
    }

    if (targetBtn) {
        targetBtn.classList.add('active');
    }
}


// 產品分類內容的切換點擊

buttonsCategoryP.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        switchNavProductCategory(btn.dataset.categoryp);
    })
})

// nav 下拉選單類別連結點擊 
navProductCategory.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        switchNavProductCategory(link.dataset.categoryp);
    })
});

// 用網址的 ?categoryp=xxx 決定要顯示哪個分類
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const defaultCategory = urlParams.get('categoryp') || 'all';
    switchNavProductCategory(defaultCategory); // 直接呼叫你現有的切換函式
});