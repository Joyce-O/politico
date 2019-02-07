const signupBtn = document.getElementById('signupBtn');
     const firstName = document.getElementById('name').value.trim();
     const lastName = document.getElementById('lastname').value;
     const email = document.getElementById('email').value;
     const phone = document.getElementById('phone').value;
     const password = document.getElementById('password').value;

signupBtn.addEventListener("click", event => {

let url = "http://localhost:5700/api/v1/auth/signup?"
let data = {
  firstname: firstName,
  lastname: lastName,
  email: email,
  phone: phone,
  password: password
}

let fetchData = { 
  method: 'POST', 
  body: JSON.stringify(data),
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-type': 'application/json'
  }
}
fetch(url, fetchData)

  .then(response => response.json())
  .then((data) => {
    
      let errMsg = '';
      errMsg = 'Please make sure to input correct values';
      if (data.message === errMsg) {
        let err = data.errors;

        displayError(JSON.stringify(err.invalidInput));
        return;
      }else {
        const jwt_decode = (token) => {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          return JSON.parse(window.atob(base64));
        }
        localStorage.setItem('token', data.token);
        setTimeout(function () {
          location.assign('./profile.html');
      }, 1000);
        
        console.log(data);
      }

  })
    .catch(error => console.log(error.message));
  event.preventDefault();
})

const displayError = (feedback)  => {
  const alert = document.getElementById('alert');
  alert.innerHTML = feedback;
  alert.style.display = 'inline-block';
 
}

