// // Funct. to display error to user
// const displayError = (feedback) => {
//     const alert = document.getElementById('alert');
//     alert.innerHTML = feedback;
//     alert.style.display = 'inline-block';
//   };
  
//   // Funct. that processes fetch api call
//   const signup = (event) => {
//     // Get signup submit btn
//     const signupBtn = document.getElementById('signupBtn').trim();
//     // Inputs from user
//     const firstName = document.getElementById('name').value.trim();
//     const lastName = document.getElementById('lastname').value.trim();
//     // eslint-disable-next-line no-undef
//     const email = document.getElementById('email').value.trim();
//     const phone = document.getElementById('phone').value.trim();
//     const passportUrl = document.getElementById('photo').trim();
//     const password = document.getElementById('password').value.trim();
  
//     event.preventDefault();
  
//     if (event.target === signupBtn) {
//       const url = 'http://localhost:5700/api/v1/auth/signup?';
  
//       const data = {
//         firstName,
//         lastName,
//         email,
//         phone,
//         passportUrl,
//         password,
//       };
  
//       const fetchData = {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//           Accept: 'application/json, text/plain, */*',
//           'Content-type': 'application/json',
//         },
//       };
//       fetch(url, fetchData)
  
//         .then(response => response.json())
//         .then((data) => {
//                   let errMsg = '';
//                   errMsg = 'Please make sure to input correct values';
//                   if (data.message === errMsg) {
//                       let err = data.errors;
//                       console.log(data);
  
//                       displayError(JSON.stringify(err.invalidInput));
//                       return;
//                   } 
//                       localStorage.setItem('token', data.token);
//                       console.log(data);
//                       location.assign('profile.html');
                  
  
//               });
//     }
//   };
  
  
//   document.getElementById('signup-form').addEventListener('click', signup);
  
const signupBtn = document.getElementById('signupBtn');
    // Inputs from user
     const firstName = document.getElementById('name').value.trim();
     const lastName = document.getElementById('lastname').value.trim();
     // eslint-disable-next-line no-undef
     const email = document.getElementById('email').value.trim();
     const phone = document.getElementById('phone').value.trim();
    //  const passportUrl = document.getElementById('photo').value.trim();
     const password = document.getElementById('password').value.trim();
const jwt_decode = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
}

signupBtn.addEventListener("click", event => {
  fetch("http://localhost:5700/api/v1/auth/signup?", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone: phone,
      passportUrl: passportUrl,
      password: password
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.message !== "Your signup is successful!") {
        // loginError.style.display = "block";
        // loginError.innerHTML = data.message;
        // setTimeout(() => {
        //   loginError.style.display = "none";
        // }, 3000);
        console.log("error");
      } else {
        localStorage.setItem("authToken", data.data.token);
        const decoded = jwt_decode(data.data.token);
        window.location = "profile.html";
      }
    })
    .catch(error => console.log(error.message));
  event.preventDefault();
})