const correctSignup = {
  firstname: 'Juliem',
  lastname: 'Johnm',
  email: 'jujo2@hotmail.com',
  phone: '234800000845',
  passportUrl: 'https://res.cloudinary.com/duk5ix8wp/image/upload/v1539063817/mfj9epgqaqbtpqdocet4.jpg',
  password: '12345'
};

const incorrectSignup = {
  firstname: 'Juliem',
  email: 'jujo3@hotmail.com',
  phone: '234800000845',
  passportUrl: 'https://res.cloudinary.com/duk5ix8wp/image/upload/v1539063817/mfj9epgqaqbtpqdocet4.jpg',
  password: '12345'
};

const emailExist = {
  firstname: 'Juliem',
  lastname: 'Johnm',
  email: 'jujo@hotmail.com',
  phone: '234800000845',
  passportUrl: 'https://res.cloudinary.com/duk5ix8wp/image/upload/v1539063817/mfj9epgqaqbtpqdocet4.jpg',
  password: '12345'
};

const correctLogin = {
  email: 'jujo2@hotmail.com',
  password: '12345'
};
const incorrectLogin = {
  email: 'hotmail.com',
  password: '12345'
};

const emailNotExist = {
  email: 'rajujo@hotmail.com',
  password: '12345'
};

export {
  correctSignup, incorrectSignup, emailExist, correctLogin, incorrectLogin, emailNotExist
};
