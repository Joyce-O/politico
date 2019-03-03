// const primary = document.getElementById('uplodfile');
// const secondary = document.getElementById('edit-img');
// const img = document.getElementById('to-edit');
// // const fileError = document.getElementById('file-error');


// function clickPrimaryButton(e) {
//   e.preventDefault();
//   primary.click();

//   primary.onchange = () => {
//    img.src = primary.files[0];
//   };
// }

// secondary.addEventListener('click', clickPrimaryButton);
document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    console.log(name);
    document.querySelector('#name').value = name;
    document.querySelector('#acronym-edit').value = acronym;
    document.querySelector('#hdqtrs').value = hqaddress;
    document.querySelector('#slogan').value = slogan;
    document.querySelector('#phone').value = phone;
    document.querySelector('#email').value = email;
    document.getElementById('to-edit').src = url;
  }
};

const fileError = document.getElementById('file-error');
  // const nameEdit = document.querySelector('#name').value.trim();
  const party = JSON.parse(localStorage.getItem('partyToEdit'));
  const token = localStorage.getItem('token');
  const {
    id, name, acronym, hqaddress, slogan, phone, email,
  } = party;
  const { url } = JSON.parse(party.logourl);
  
const edit = (event) => {
  event.preventDefault();
  const name =  document.querySelector('#name').value.trim();
  Number(id)
  // console.log(token);
  // const baseUrl = `http://localhost:5700/api/v1/${id}/name`;
  // const options = {
  //   method: 'PATCH',
  //   headers: {
  //     Accept: 'application/json, text/plain, */*',
  //     'Content-type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     editName, token,
  //   }),
  // };

  fetch(`http://localhost:5700/api/v1/parties/2/name`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      // Authorization: token,
    },
    body: JSON.stringify({
      name, token,
    }),
  })
  // fetch(baseUrl, options)
    .then(response => response.json())
    .then((data) => {
      console.log(data.error);

      const err = 'Name already exist';
      if (data.error === err) {
        fileError.innerHTML = err;
        document.getElementById('name').oninput = () => {
          fileError.innerHTML = '';
        };
      }
      if (data.status === 200) {
        setTimeout(() => {
          window.location.href = ('admin_dashboard.html');
        }, 5000);
      }
    })
    .catch((error) => {
      console.log('Server error!', error);
    });
};

document.querySelector('#partyForm').addEventListener('submit', edit);
