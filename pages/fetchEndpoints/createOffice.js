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

const nameError = document.querySelector('#name-error');


const offices = (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const type = document.getElementById('type').value.trim();
  const ageLimit = document.getElementById('ageLimit').value.trim();
  const select = document.getElementById('basicQual');
  // const nameError = document.querySelector('#name-error');

  const basicQual = select.options[select.selectedIndex].value;

  const url = 'http://localhost:5700/api/v1/offices?';
  // const url = `https://ng-politico.herokuapp.com/api/v1/parties?`
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name, type, ageLimit, basicQual, token,
    }),
  };
  fetch(url, options)
    .then(response => response.json())
    .then((data) => {
      const dupName = 'Name already exist, please register with another name.';
      if (data.error === dupName) {
        nameError.innerHTML = dupName;
        document.getElementById('name').oninput = () => {
          nameError.innerHTML = '';
        };
        return;
      }

      if (data.status === 201) {
        // const { token } = data.data[0];
        // localStorage.setItem('token', token);
        setTimeout(() => {
          window.location.href = ('political_offices.html');
        }, 5000);
      }
    })
    .catch((error) => {
      console.log('System error', error);
    });
};


document.querySelector('#addOffice').addEventListener('submit', offices);
