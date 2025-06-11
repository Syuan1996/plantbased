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
  startTyping();
});

CloseMagnifier.addEventListener("click", () => {
  popup.classList.remove("popTriger");
});

// 點擊灰黑色背景也能讓搜尋彈窗關掉 start
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("popTriger");
  }
})

// 點擊灰黑色背景也能讓搜尋彈窗關掉 end

// 搜尋框裡面文字打字機效果start
let searchInput = document.querySelector('.searchBox input');
let text = "請輸入搜尋內容....";
let typingTimer = null; // 儲存打字機interval
let cursorTimer = null; // 儲存游標閃爍interval

function startTyping() {
  clearInterval(typingTimer);//清除舊的打字
  clearInterval(cursorTimer);//清除舊的閃爍
  let i = 0;

  typingTimer = setInterval(() => {
    searchInput.placeholder = text.substring(0, i) + "│";
    i++;

    if (i > text.length) {
      clearInterval(typingTimer);
      endTypingAndFocus(); //結束虛擬打字游標與focus回去
    }
  }, 130);
}

function endTypingAndFocus() {

  let count = 3;
  let timer = setInterval(() => {
    searchInput.placeholder = text + (count % 2 === 0 ? "│" : " ");
    count--;

    if (count <= 0) {
      clearInterval(timer);
      searchInput.placeholder = text;
      searchInput.focus();
    }
  }, 350);
}

// 記得startTyping()放回OpenMagnifier.addEventListener上面的點擊時
OpenMagnifier.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  startTyping();

});


// 搜尋框裡面文字打字機效果end

// 搜尋彈窗end


// 表單禁止預設行為的判斷
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault(); // 阻止表單送出
});
