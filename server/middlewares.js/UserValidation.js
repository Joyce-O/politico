import Joi from 'joi';
import { newUserSchema, loginSchema } from '../utilities/inputSchema';

export default class UserValidation {
  static handleSignup(request, response, next) {
    const { error } = Joi.validate(request.body, newUserSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          status: 400,
          error: error.details.map(d => d.context)
        });
      return false;
    }
    next();
  }

  static handleLogin(request, response, next) {
    const { error } = Joi.validate(request.body, loginSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          status: 400,
          error: error.details.map(d => d.context)
        });
      return false;
    }
    next();
  }
}
