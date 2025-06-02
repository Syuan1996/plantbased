document.querySelectorAll('.qWrap').forEach(qWrap => {
    qWrap.addEventListener('click', function () {
        const thisWrap = this.closest('.qaWrap');
        const aWrap = thisWrap.querySelector('.aWrap');
        const isOpen = thisWrap.classList.contains('open');

        // 把所有 .qaWrap 關掉，高度歸零，圖片顯示狀態還原
        document.querySelectorAll('.qaWrap').forEach(wrap => {
            wrap.classList.remove('open');
            const a = wrap.querySelector('.aWrap');
            a.style.height = '0';
        });

        // 如果目前是關閉的，打開它
        if (!isOpen) {
            thisWrap.classList.add('open');

            // 先讓 aWrap 高度設為 auto 取得 scrollHeight，再設定為 0，稍後再切換成 scrollHeight 做展開動畫
            aWrap.style.height = 'auto';
            const fullHeight = aWrap.scrollHeight + 'px';
            aWrap.style.height = '0';

            setTimeout(() => {
                aWrap.style.height = fullHeight;
            }, 10);
        }
    });
});
