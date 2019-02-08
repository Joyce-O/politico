// Hide and show toggle menu
let menuSpan = document.getElementById('menu-span');

window.onclick = function (event) {
    let aside = document.querySelector('aside');
    if (event.target == menuSpan) {
        let deviceWidth = window.innerWidth;
        let asideClass = aside.classList;
        asideClass.add('fade-in')
        asideClass.add('toggled-nav');
        document.querySelector(.admin-menu).style.color = "white";

    }
 
    let check = 0;
    if (event.target === aside) {
        aside.style.display = "none";

      } else {
          aside.style.display = "block";
      }
}
