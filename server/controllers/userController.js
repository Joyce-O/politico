import pool from '../database/dbConnection';
import { insertUser, queryUsersByEmail } from '../database/queries';
import { generateToken } from '../middlewares.js/authorization';
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
        const token = generateToken(data.rows[0]);
        const user = [firstname, lastname, email, phone,
          passportUrl];

        return response.status(201)
          .json({
            message: 'Your signup is successful!',
            status: 201,
            token,
            data: user,

          });
      })
      .catch(error => response.status(500)
        .json({
          status: 400,
          error: error.message,
        }));
  }

  static loginUser(request, response) {
    const isEmail = [request.body.email];
    pool.query(queryUsersByEmail, isEmail)
      .then((data) => {
        if (data.rowCount !== 0) {
          const isPassword = verifyPassword(request.body.password, data.rows[0].password);
          if (isPassword) {
            const {
              firstname, lastname, phone, email,
            } = data.rows[0];
            const token = generateToken(data.rows[0]);
            const user = [
              firstname, lastname, email, phone,
            ];
            response.status(200)
              .json({
                status: 200,
                token,
                data: user,
              });
          } else {
            response.status(400)
              .json({
                status: 400,
                error: 'Sorry, the credentials you provided is incorrect.',
              });
          }
        }
        if (data.rowCount === 0) {
          response.status(400)
            .json({
              status: 400,
              error: 'Sorry, the credentials you provided is incorrect.',
            });
        }
      })
      .catch((error) => {
        response.json({
          status: 400,
          error: error.message,
        });
      });
  }
}
