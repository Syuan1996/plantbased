let buttonsCategoryn = document.querySelectorAll('.newsContentTag [data-categoryn]');
let navNewCategory = document.querySelectorAll('nav.mainNav [data-categoryn]');
let newContentItems = document.querySelectorAll(".newsContentItem");
let pagination = document.querySelector('.pagination');
const itemsPerPage = 3; // 每頁顯示的項目數量

// 顯示分類的項目
function switchNavNewCategory(newc) {
    newContentItems.forEach(item => {
        item.classList.add('hidden'); // 先隱藏全部

        if (
            newc === 'allnew' ||
            (newc === 'promotion' && item.classList.contains('proNew')) ||
            (newc === 'cook' && item.classList.contains('cookNew')) ||
            (newc === 'nutrition' && item.classList.contains('NutrNew'))
        ) {
            item.classList.remove('hidden'); // 顯示符合分類的
        }
    });

    // 移除所有active的狀態
    buttonsCategoryn.forEach(button => button.classList.remove('active'));
    // 加上active的按鈕
    let targetBtn = null;
    buttonsCategoryn.forEach(button => {
        if (button.dataset.categoryn === newc) {
            targetBtn = button;
        }
    });

    if (targetBtn) {
        targetBtn.classList.add('active');
    }

    // 呼叫分頁函數來更新頁碼
    updatePagination(newc);
}

// 更新頁碼
function updatePagination(category) {
    let filteredItems = Array.from(newContentItems).filter(item => {
        return (
            category === 'allnew' ||
            (category === 'promotion' && item.classList.contains('proNew')) ||
            (category === 'cook' && item.classList.contains('cookNew')) ||
            (category === 'nutrition' && item.classList.contains('NutrNew'))
        );
    });

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    pagination.innerHTML = ''; // 清空現有的頁碼

    for (let i = 1; i <= totalPages; i++) {
        let pageSpan = document.createElement('span');
        pageSpan.classList.add('pageNumber');
        pageSpan.dataset.page = i;
        pageSpan.textContent = i;

        pageSpan.addEventListener('click', () => {
            showPage(i, filteredItems);
        });

        pagination.appendChild(pageSpan);
    }

    // 顯示第一頁
    showPage(1, filteredItems);
}

// 顯示當前頁面資料
function showPage(pageNumber, filteredItems) {
    let startIndex = (pageNumber - 1) * itemsPerPage;
    let endIndex = pageNumber * itemsPerPage;

    filteredItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });

    // 更新頁碼的active狀態
    document.querySelectorAll('.pagination .pageNumber').forEach(page => {
        page.classList.remove('active');
    });
    document.querySelector(`.pagination .pageNumber[data-page="${pageNumber}"]`).classList.add('active');
}

// 產品分類內容的切換點擊
buttonsCategoryn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        switchNavNewCategory(btn.dataset.categoryn);
    });
});

// nav 下拉選單類別連結點擊
navNewCategory.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        switchNavNewCategory(link.dataset.categoryn);
    });
});

// 用網址的 ?categoryn=xxx 決定要顯示哪個分類
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const defaultCategory = urlParams.get('categoryn') || 'allnew';
    switchNavNewCategory(defaultCategory); // 呼叫切換函式
});
