const decodeJwt = (isToken) => {
  const token = {};
  token.raw = isToken;
  token.header = JSON.parse(window.atob(isToken.split('.')[0]));
  token.payload = JSON.parse(window.atob(isToken.split('.')[1]));
  return (token);
};
const token = localStorage.getItem('token');

if (!token) {
  window.location.assign('unauthorize.html');
}

const decoded = decodeJwt(token);
const { isadmin } = decoded.payload.payload;
if (isadmin !== true) {
  window.location.assign('unauthorize.html');
}

const photo = document.querySelector('#photo');
const nameError = document.querySelector('#name-error');
const acronymErr = document.querySelector('#acronym-error');
const fileError = document.getElementById('file-error');

document.querySelector('#photo').onchange = () => {
  if (photo.files[0].size > 1048576) {
    fileError.innerHTML = 'image should not exceed 1 mb, try again';
    photo.value = '';
  } else {
    fileError.innerHTML = '';
  }
};

const parties = (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const acronym = document.getElementById('acronym').value.trim();
  const email = document.getElementById('email').value.trim();
  const hqAddress = document.getElementById('hqAddress').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const slogan = document.getElementById('slogan').value.trim();

  const url = 'http://localhost:5700/api/v1/parties?';
  // const url = `https://ng-politico.herokuapp.com/api/v1/parties?`
  const formData = new FormData();
  formData.append('name', name);  
  formData.append('acronym', acronym);
  formData.append('slogan', slogan);
  formData.append('hqAddress', hqAddress);
  formData.append('logoUrl', photo.files[0]);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('token', token);
  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  };
  fetch(url, options)
    .then(response => response.json())
    .then((data) => {
      if (data.error === 'Logo image upload failed, try again.') {
        fileError.innerHTML = data.error;
        photo.addEventListener('change', () => {
          fileError.innerHTML = '';
        }, false);
        return;
      }
      const dupName = 'Sorry the name aready exist, register with another name.';
      if (data.error === dupName) {
        emailError.innerHTML = dupName;
        document.getElementById('name').oninput = () => {
          nameError.innerHTML = '';
        };
        return;
      }
      const dupAcrnym = 'Sorry the acronym aready exist, register with another acronym.';
      if (data.error === dupAcrnym) {
        emailError.innerHTML = dupAcrnym;
        document.getElementById('acronym').oninput = () => {
          acronymErr.innerHTML = '';
        };
        return;
      }
      const dupEmail = 'Sorry the email aready exist, register with another email.';
      if (data.error === dupEmail) {
        emailError.innerHTML = dupEmail;
        document.getElementById('email').oninput = () => {
          acronymErr.innerHTML = '';
          acronymErr.className = 'shift-l';
        };
        return;
      }

      if (data.status === 201) {
        // const { token } = data.data[0];
        // localStorage.setItem('token', token);
        setTimeout(() => {
          window.location.href = ('admin_dashboard.html');
        }, 5000);
      }
    })
    .catch((error) => {
      console.log('System error', error);
    });
};


document.querySelector('#addParty').addEventListener('submit', parties);
