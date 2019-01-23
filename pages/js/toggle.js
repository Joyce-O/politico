// Hide and show toggle menu
// const resize = () => {
let menuSpan = document.getElementById('menu-span');
console.log("YESS");
window.onclick = function (event) {
    if (event.target == menuSpan) {
        let deviceWidth = window.innerWidth;
        let aside = document.querySelector('aside');
        let asideClass = aside.classList;
        asideClass.add('fade-in')
        asideClass.add('toggled-nav');

    }
}