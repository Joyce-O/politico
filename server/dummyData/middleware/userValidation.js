import Joi from 'joi';
import users from '../jsObjects/userModel';
import { newUserSchema } from './inputModel';

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
}


const {
  signupHelper
} = UserValidator;
export default signupHelper;
