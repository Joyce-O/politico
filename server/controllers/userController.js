import users from '../dummyData/users';


export default class UserController {
  static registerUser(request, response) {
    const dupEmail = users.find(user => user.email === request.body.email);
    if (dupEmail !== undefined) {
      response.status(409)
        .json({
          status: 409,
          error: 'Email already exist, please use another email or login.'
        });
      return false;
    }
    const newUser = {
      id: users.length,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      phone: request.body.phone,
      password: request.body.password,
    };


    users.push(newUser);
    return response.status(201)
      .json({
        status: 201,
        data: newUser
      });
  }

  static LoginUser(request, response) {
    const { email, password } = request.body;
    const user = users.find(obj => obj.email === email);
    if (user === undefined || (user.password !== password)) {
      response.status(404)
        .json({
          status: 404,
          error: 'email or password does not exist',
        });
      return false;
    }
    return response.status(200)
      .json({
        status: 200,
        data: `Welcome back ${user.firstname}!`,
      });
  }
}