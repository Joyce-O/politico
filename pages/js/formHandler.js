/* eslint-env browser */

// if (document.getElementById("home-signup")) {
//     document.getElementById("home-signup-form").addEventListener("submit", (e) => {
//         e.preventDefault();
//         window.location.assign("/pages/admin_dashboard.html");
//     });
// }

if (document.getElementById('edit-submit')) {
  document.getElementById('partyForm').addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.assign('/pages/party_details.html');
  });
}

if (document.getElementById('submitParty')) {
  document.getElementById('addParty').addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.assign('/pages/admin_dashboard.html');
  });
}

if (document.getElementById('submitOffice')) {
  document.getElementById('addOffice').addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.assign('/pages/political_offices.html');
  });
}

if (document.getElementById('submitPol')) {
  document.getElementById('addPol').addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.assign('/pages/profile.html');
  });
}
