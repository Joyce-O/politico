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

const { passportUrl } = decoded.payload.payload;
function clickId() {
  localStorage.setItem('clickedOffice', JSON.stringify(window.event.target.id));
  // alert(window.event.target.id);
}

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    document.getElementById('avatar').src = passportUrl;
    const partyUrl = 'http://localhost:5700/api/v1/offices?';
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
        const offices = data.data;
        console.log(offices);
        localStorage.setItem('offices', JSON.stringify(offices));
        const officesTable = document.querySelector('#officeTable');
        offices.forEach((office) => {
          const officeRow = document.createElement('TR');
          const { name, basicqual, type } = office;
          officeRow.innerHTML = `<td>${type}</td>
          <td>${office.name}</td>
          <td>${office.basicqual}</td>                                                                     
            <td class="logo-line2"><a id="${office.name}"href="political_details.html" class="menu-ico-2" onClick="clickId()">&hellip;</a></td>`;
          officesTable.appendChild(officeRow);
        });
        //   allmenuTable.appendChild(newTableRow);
      })
      .catch((error) => {
        console.log('System error', error);
      });
  }
};
