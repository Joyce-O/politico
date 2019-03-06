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
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
  
  const { passportUrl } = decoded.payload.payload;
  document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
      document.getElementById('avatar').src = passportUrl;
      const officeName= localStorage.getItem('clickedOffice');
      const offices = JSON.parse(localStorage.getItem('offices'));
      const office = offices.find(officeList => JSON.stringify(officeList.name === officeName));
      const createNode = element => document.createElement(element);
      const append = (parent, el) => parent.appendChild(el);
      const partyDiv = document.querySelector('#party-div');
      const flagDiv = createNode('DIV');
      // const p = createNode('p');
      // p.className = 'party-initial';
      // let img = createNode('img');
      flagDiv.id = 'flag-div-office';
      flagDiv.order = 1;
      detailsHq.id = 'details-hq';
      // p.innerHTML = `${party.name}<span>...for now and the future!</span>`;
      // append(flagDiv, p);
      flagDiv.innerHTML = `<p class="party-initial">${party.name}<span>...${party.slogan}</span></p>
      <img id="flag" src="${url}" alt="profile name" width="20px">`;
  
      detailsHq.innerHTML = `<label for="Chai">
      <b>Headquarters</b>
  </label>
  <p>${party.hqaddress}</p>
  <label for="Chai">
      <b>Phone</b>
  </label>
  <p>${party.phone}</p>`;
      append(flagDiv, detailsHq);
      append(partyDiv, flagDiv);
      // document.querySelector('#party-div').appendChild(detailsHq);
      // const partyUrl = 'http://localhost:5700/api/v1/parties?';
      // const options = {
      //   method: 'GET',
      //   headers: {
      //     Accept: 'application/json, text/plain, */*',
      //     'Content-type': 'application/json',
      //     Authorization: token,
      //   },
      // };
    }
  };
  