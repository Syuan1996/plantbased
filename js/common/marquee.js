let closeMarquee = document.querySelector(".closeMarquee");
let marqueeWrapper = document.querySelector(".marqueeWrapper");

let headerTop = document.getElementsByTagName("header")[0];
let body = document.getElementsByTagName("body")[0];


function updateBodyPadding() {
    body.style.paddingTop = headerTop.offsetHeight + "px";
}
closeMarquee.addEventListener("click", function () {
    marqueeWrapper.style.display = "none";
    headerTop.style.top = "0px";
    updateBodyPadding();

    window.addEventListener("resize", updateBodyPadding);

})