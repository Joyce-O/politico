import Joi from 'joi';
import users from '../dummyData/userModel';
import { newUserSchema, loginSchema } from './inputSchema';

class UserValidator {
  static signupHelper(request, response, next) {
    const { email } = request.body;
    const { error } = Joi.validate(request.body, newUserSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          success: false,
          message: error.details.map(d => d.message)
        });
      return false;
    }
    const dupEmail = users.find(user => user.email === email);
    if (dupEmail !== undefined) {
      response.status(409)
        .json({
          success: false,
          message: 'Email already exist, please use another email or login.'
        });
      return false;
    }
    next();
  }

  static loginHelper(request, response, next) {
    const { email, password } = request.body;
    const { error } = Joi.validate(request.body, loginSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          success: false,
          message: error.details.map(d => d.message)
        });
      return false;
    }
    const userExist = users.find(user => user.email === email);
    if (userExist === undefined || (userExist.password !== password)) {
      response.status(404)
        .json({
          success: false,
          message: 'email or password does not exist',
        });
      return false;
    }
    request.body.firstname = userExist.firstname;
    next();
  }
}


const {
  signupHelper, loginHelper
} = UserValidator;
export { signupHelper, loginHelper };
