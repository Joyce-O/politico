import users from '../jsObjects/userModel';

class userControl {
  static userHandler(request, response) {
    request.body = JSON.parse(JSON.stringify(request.body));
    const newUser = {
      id: users.length,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      phone: request.body.phone,
      passportUrl: request.body.hasOwnProperty('passportUrl') ? request.body.passportUrl : request.file.originalname,
      password: request.body.password,
    };


    users.push(newUser);
    return response.status(201)
      .json({
        message: `Welcome ${newUser.firstname}`,
        newUser
      });
  }

  static loginHandler(request, response) {
    const { firstname } = request.body;
    return response.status(201)
      .json({
        success: true,
        message: `Welcome back ${firstname}!`,
      });
  }
}

const { userHandler, loginHandler } = userControl;
export { userHandler, loginHandler };
