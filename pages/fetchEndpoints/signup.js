
const photo = document.querySelector('#photo');
const emailError = document.querySelector('#email-error');
const fileError = document.getElementById('file-error');

document.querySelector('#photo').onchange = () => {
  if (photo.files[0].size > 1048576) {
    fileError.innerHTML = 'image should not exceed 1 mb, try again';
    photo.value = '';
  } else {
    fileError.innerHTML = '';
  }
};

const signup = (event) => {
  event.preventDefault();
  const firstName = document.getElementById('name').value.trim();
  const lastName = document.getElementById('lastname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value.trim();

  const url = 'http://localhost:5700/api/v1/auth/signup?';
  // const url = `https://ng-politico.herokuapp.com/api/v1/auth/signup?`
  const formData = new FormData();
  formData.append('firstname', firstName);
  formData.append('lastname', lastName);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('passportUrl', photo.files[0]);
  formData.append('password', password);
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
      if (data.error === 'Passport image upload failed, try again.') {
        fileError.innerHTML = data.error;
        photo.addEventListener('change', () => {
          fileError.innerHTML = '';
        }, false);
        return;
      }
      const dupEmail = 'Email already exist, please use another email or login.';
      if (data.error === dupEmail) {
        emailError.innerHTML = dupEmail;
        document.getElementById('email').oninput = () => {
          emailError.innerHTML = '';
        };
        return;
      }
      if (data.status === 201) {
        const { token } = data.data[0];
        localStorage.setItem('token', token);
        setTimeout(() => {
          window.location.href = ('profile.html');
        }, 5000);
      }
    })
    .catch((error) => {
      console.log('System error', error);
    });
};


document.querySelector('#home-signup-form').addEventListener('submit', signup);
