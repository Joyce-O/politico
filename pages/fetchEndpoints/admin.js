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
function clickId() {
  localStorage.setItem('clickedParty', JSON.stringify(window.event.target.id));
  // alert(window.event.target.id);
}
document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    document.getElementById('avatar').src = passportUrl;
    const partyUrl = 'http://localhost:5700/api/v1/parties?';
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: token,
      },
    };

    fetch(partyUrl, options)
      .then(response => response.json())
      .then((data) => {
        const parties = data.data;
        localStorage.setItem('parties', JSON.stringify(parties));
        const partiesTable = document.querySelector('#partiesTable');
        parties.forEach((party) => {
          const partyRow = document.createElement('TR');
          const logo = JSON.parse(party.logourl);
          partyRow.innerHTML = `<td><img src="${logo.url}" class="menu-logo"></td>
          <td>${party.name}</td>
          <td>${party.hqaddress}</td>
          <td class="logo-line2"><a id="${party.acronym}"href="party_details.html" class="menu-ico-2" onClick="clickId()">&hellip;</a></td>`;
          partiesTable.appendChild(partyRow);
        });
        //   allmenuTable.appendChild(newTableRow);
      })
      .catch((error) => {
        console.log('System error', error);
      });
  }

  // const savedParties = JSON.parse(localStorage.getItem('parties'));
  // savedParties.forEach((party) => {
  //   document.querySelector(`#${party.acronym}`).addEventListener('click', () => { console.log(`${party.acronym}`); });
  // });
};
