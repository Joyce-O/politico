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
  const token = localStorage.getItem('token');
  const party = JSON.parse(localStorage.getItem('partyToEdit'));
  const { id } = party;
  const url = 'http://localhost:5700/api/v1';
  fetch(`${url}/parties/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data.message);
      const message = 'This order is deleted';
      if (data.message === message) {
        deleteBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
        document.getElementById('feedack').innerText = message;
        setTimeout(() => {
          window.location.href = ('admin_dashboard.html');
        }, 300);
      }
    })
    .catch((error) => {
      console.log('System error!', error);
    });
};
// document.querySelector('#delete-form').addEventListener('submit', deleteMenu);
// window.location.assign('/pages/admin_dashboard.html');
cancelBtn.onclick = function (e) {
  e.preventDefault();
  window.location.assign('party_details.html');
};

span.onclick = function () {
  // modal.style.display = 'none';
  window.location.assign('party_details.html');
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    // modal.style.display = 'none';
    window.location.assign('party_details.html');
  }
};
