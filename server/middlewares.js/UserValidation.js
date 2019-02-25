import Joi from 'joi';
import pool from '../database/dbConnection';
import { queryUsersByEmail } from '../database/queries';
import { newUserSchema, loginSchema } from '../utilities.js/inputSchema';


export default class UserValidation {
  static handleSignup(request, response, next) {
    const { error } = Joi.validate(request.body, newUserSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          status: 400,
          error: error.details.map(d => d.context),
        });
      return false;
    }

    pool.query(queryUsersByEmail, [request.body.email])
      .then((data) => {
        if (data.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 409,
              error: 'Email already exist, please use another email or login.',
            });
        }
        next();
      });
  }

  static handleLogin(request, response, next) {
    const { error } = Joi.validate(request.body, loginSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          status: 400,
          error: error.details.map(d => d.context),
        });
      return false;
    }
    const isEmail = [request.body.email];
    pool.query(queryUsersByEmail, isEmail)
      .then((data) => {
        if (data.rowCount === 0) {
          response.status(400)
            .json({
              status: 400,
              error: 'Sorry, the credentials you provided is incorrect. try again',
            });
        }
        return next();
      });
  }
}
