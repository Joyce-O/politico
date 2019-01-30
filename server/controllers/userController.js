import pool from '../database/dbConnection';
import { insertUser, queryUsersByEmail } from '../database/queries';
import { getToken } from '../middlewares.js/authorization';
import { hashPassword, verifyPassword } from '../utilities.js/hashPassword';

export default class UserController {
  static registerUser(request, response) {
    const {
      firstname, lastname, email, phone, passportUrl, password,
    } = request.body;
    const values = [
      firstname,
      lastname,
      email,
      phone,
      passportUrl,
      hashPassword(password),
    ];

    pool.query(queryUsersByEmail, [email])
      .then((data) => {
        if (data.rowCount !== 0) {
          response.status(409)
            .json({
              status: 409,
              error: 'Email already exist, please use another email or login.',
            });
          return false;
        }
      });

    pool.query(insertUser, values)
      .then((data) => {
        const token = getToken(data.rows[0]);
        const { name, registered } = data.rows[0];
        const user = { name, email, registered };

        response.status(201)
          .json({
            status: 201,
            data: [{ token, user }],

          });
      })
      .catch(error => response.status(500)
        .json({
          status: 500,
          error: error.message,
        }));
  }

  static loginUser(request, response) {
    const email = [request.body.email];
    pool.query(queryUsersByEmail, email)
      .then((data) => {
        if (data.rowCount !== 0) {
          const isPassword = verifyPassword(request.body.password, data.rows[0].password);
          if (isPassword) {
            const token = getToken(data.rows[0]);
            const { name, registered } = data.rows[0];
            const user = { name, email, registered };
            response.status(200)
              .json({
                status: 200,
                data: [{ user, token }],
              });
          } else {
            response.status(400)
              .json({
                status: 400,
                error: ['Make sure your password is correct'],
              });
          }
        }
        if (data.rowCount === 0) {
          response.status(400)
            .json({
              status: 400,
              error: 'Email is not found, please enter correct email and password',
            });
        }
      })
      .catch((error) => {
        response.json({
          status: 500,
          error: error.message,
        });
      });
  }
}
