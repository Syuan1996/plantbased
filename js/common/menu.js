// 手機板Dropdown start


// 只對含有 dropdown 的選單進行處理
document.querySelectorAll('.productDropdown > a, .newDropdown > a').forEach(link => {
  link.addEventListener('click', function (e) {
    const isMobile = window.innerWidth <= 767;
    if (isMobile) {
      e.preventDefault(); // 手機版才阻止連結跳轉
      const dropdown = this.parentElement.querySelector('.dropdown');
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
  });
});

//  螢幕變大時自動收起 dropdown
window.addEventListener('resize', function () {
  if (window.innerWidth > 767) {
    document.querySelectorAll('.dropdown').forEach(drop => {
      drop.style.display = ''; // 移除 inline style（還原原本 display:none）
    });
  }
});


// 手機板Dropdown  end

// 手機板開合選單 start

const openBtn = document.querySelector('.openNav');
const closeBtn = document.querySelector('.closeNav');
const mainNav = document.querySelector('.mainNav');
const iconNav = document.querySelector('.iconNav');

// 點擊漢堡按鈕 => 開啟選單
openBtn.addEventListener('click', function () {
  mainNav.classList.add('active');
  iconNav.classList.add('active');
  openBtn.style.display = 'none';
  closeBtn.style.display = 'block';
});

// 點擊叉叉 => 關閉選單
closeBtn.addEventListener('click', function () {
  mainNav.classList.remove('active');
  iconNav.classList.remove('active');
  closeBtn.style.display = 'none';
  openBtn.style.display = 'block';
});

// resize 時自動關閉手機選單（大於767就不該開著）
window.addEventListener('resize', function () {
  if (window.innerWidth > 767) {
    mainNav.classList.remove('active');
    iconNav.classList.remove('active');
    closeBtn.style.display = 'none';
    openBtn.style.display = 'none'; // 桌機本不顯示
  } else {
    openBtn.style.display = 'block';
  }
});
// 手機板開合選單 end


// 搜尋彈窗start

let popup = document.querySelector('.pupUpBg');

let OpenMagnifier = document.querySelector('.magnifierIcon');

let CloseMagnifier = document.querySelector('.closePopBtn');


OpenMagnifier.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.add("popTriger");
})

CloseMagnifier.addEventListener("click", () => {
  popup.classList.remove("popTriger");
})


// 搜尋彈窗end


// 表單禁止預設行為的判斷
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault(); // 阻止表單送出
});
