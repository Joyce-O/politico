/* eslint-env browser */
// Reset password modal

const modal = document.getElementById('del-myModal');
const deleteBtn = document.getElementById('del-send-link');
const cancelBtn = document.getElementById('cancel-link');

const btn = document.getElementById('delete-btn');
const div = document.querySelector('.dash-cont');

const span = document.getElementsByClassName('del-close')[0];

btn.onclick = function () {
  modal.style.display = 'block';
  modal.style.opacity = 1;
  div.style.display = 'none';
};
deleteBtn.onclick = function (e) {
  e.preventDefault();
  window.location.assign('/pages/admin_dashboard.html');
};
cancelBtn.onclick = function (e) {
  e.preventDefault();
  window.location.assign('party_details.html');
};

span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
