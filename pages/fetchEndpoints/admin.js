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
  window.location.assign('profile.html');
}
// https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState

const { passportUrl } = decoded.payload.payload;

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    document.getElementById('avatar').src = passportUrl;
  }
};
