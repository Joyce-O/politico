// Reset password modal

let modal = document.getElementById('myModal');

let btn = document.getElementById("forgot-btn");

let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



// }
//   const $ = (selector) => {
//     return document.querySelector(selector)
//   };
//   let deviceWidth = window.innerWidth;
//   let aside = document.querySelector('aside');
//   let asideClass = aside.classList;
  
//   if (deviceWidth <= 767) {
//     document.querySelector('#main-content-page').addEventListener('click', () => {
//       asideClass.remove('fade-in');
//       asideClass.remove('toggled-nav')
//     });
    
//     document.querySelector('#menu-span').addEventListener('click', () => {
//       asideClass.add('fade-in')
//       asideClass.add('toggled-nav');
//     });
//   }
// }
