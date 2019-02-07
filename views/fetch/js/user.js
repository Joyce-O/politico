

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