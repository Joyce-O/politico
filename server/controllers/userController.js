import pool from '../database/dbConnection';
import { insertUser, queryUsersByEmail } from '../database/queries';
import { hashPassword } from '../utilities.js/hashPassword';
import { getToken } from '../utilities.js/authorization';

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
      hashPassword(password, 10),
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
        const user = data.rows[0];
        const token = getToken(user);
        const { name, registered } = user;
        const Details = { name, email, registered };

        return response.status(201)
          .json({
            status: 201,
            data: ['Sign up is successful', token,
              Details],

          });
      })
      .catch(error => response.status(500)
        .json({
          status: 500,
          data: [error.message],
        }));
  }
}
