import users from '../jsObjects/userModel';

class userControl {
  static userHandler(request, response) {
    const newUser = {
      id: users.length,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      othername: request.body.othername,
      email: request.body.email,
      phone: request.body.phone,
      passportUrl: request.file.originalname,
      password: request.body.password,
    };


    users.push(newUser);
    return response.status(201)
      .json({
        message: `Welcome ${newUser.firstname}!`,
        newUser
      });
  }
}

const { userHandler } = userControl;
export default userHandler;
