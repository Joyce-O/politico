// const decodeUser = (t) => {
//     const token = {};
//     token.raw = t;
//     token.header = JSON.parse(window.atob(t.split('.')[0]));
//     token.payload = JSON.parse(window.atob(t.split('.')[1]));
//     console.log(token);
//     return (token);
//   };
  
//   const token = localStorage.getItem('token');
  
//   if (!token) {
//     location.assign('unauthorized.html');
//   }
  
//   const decoded = decodeUser(token);
  
//   if (decoded.payload.payload.isAdmin !== true) {
//     location.assign('unauthorized.html');
//   }