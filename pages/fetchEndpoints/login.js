const login = (event) => {
  event.preventDefault();

  const fileError = document.getElementById('file-error');
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  const url = 'http://localhost:5700/api/v1/auth/login?';
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email, password,
    }),
  };

  fetch(url, options)
    .then(response => response.json())
    .then((data) => {
      const err = 'Sorry, the credentials you provided is incorrect. try again';
      if (data.error === err) {
        fileError.innerHTML = err;
        document.getElementById('email').oninput = () => {
          fileError.innerHTML = '';
        };
      }
      if (data.status === 200) {
        const { token, user } = data.data[0];
        localStorage.setItem('token', token);
        if (user.isadmin === true) {
          setTimeout(() => {
            window.location.href = ('admin_dashboard.html');
          }, 5000);
        } else {
          setTimeout(() => {
            window.location.href = ('profile.html');
          }, 5000);
        }
      }
    })
    .catch((error) => {
      console.log('System error', error);
    });
};

document.querySelector('#login-form').addEventListener('submit', login);
