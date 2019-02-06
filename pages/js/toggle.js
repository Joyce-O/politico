// Hide and show toggle menu
let menuSpan = document.getElementById('menu-span');

window.onclick = function (event) {
    if (event.target == menuSpan) {
        let deviceWidth = window.innerWidth;
        let aside = document.querySelector('aside');
        let asideClass = aside.classList;
        asideClass.add('fade-in')
        asideClass.add('toggled-nav');

    }
}