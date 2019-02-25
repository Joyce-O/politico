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

const {
  passportUrl, email, firstname, lastname, phone, address,
} = decoded.payload.payload;

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    document.getElementById('welcome-admin').innerHTML = `User ${firstname}`;
    document.getElementById('avatar').src = passportUrl;
    document.getElementById('user-img').src = passportUrl;
    document.getElementById('user-mail').innerHTML = email;
    document.getElementById('user-phone').innerHTML = phone;
    const fullname = `${firstname} ${lastname}`;
    document.getElementById('user-name').innerHTML = fullname;
    document.getElementById('user-location').innerHTML = address;
  }
};
