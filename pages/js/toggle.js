/* eslint-env browser */
// Hide and show toggle menu
const menuSpan = document.getElementById('menu-span');

window.onclick = function (event) {
  const aside = document.querySelector('aside');
  if (event.target == menuSpan) {
    const asideClass = aside.classList;
    asideClass.add('fade-in');
    asideClass.add('toggled-nav');
    document.querySelector('.admin-menu').style.color = 'white';
  }
  if (event.target === aside) {
    aside.style.display = 'none';
  } else {
    aside.style.display = 'block';
  }
};
