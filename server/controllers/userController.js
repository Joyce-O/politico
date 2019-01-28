import userObj from '../dummyData/userObj';

class userController {
  static handleSignup(request, response) {
    request.body = JSON.parse(JSON.stringify(request.body));
    const newUser = {
      id: userObj.length,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      phone: request.body.phone,
      passportUrl: request.body.hasOwnProperty('passportUrl') ? request.body.passportUrl : request.file.originalname,
      password: request.body.password,
    };


    userObj.push(newUser);
    return response.status(201)
      .json({
        message: `Welcome ${newUser.firstname}`,
        newUser
      });
  }

  static handleLogin(request, response) {
    const { firstname } = request.body;
    return response.status(200)
      .json({
        success: true,
        message: `Welcome back ${firstname}!`,
      });
  }
}


export default userController;
