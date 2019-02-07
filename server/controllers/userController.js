import bcrypt from 'bcrypt';
import pool from '../database/dbConnection';
import { insertUser, queryUsersByEmail } from '../database/queries';
import { generateToken } from '../middlewares.js/authorization';
import { verifyPassword } from '../utilities.js/hashPassword';

export default class UserController {
  static registerUser(request, response) {
    let image = 'https://res.cloudinary.com/duk5ix8wp/image/upload/v1539063817/mfj9epgqaqbtpqdocet4.jpg';
    request.body = JSON.parse(JSON.stringify(request.body));
     const {
      firstname, lastname, email, phone, password,
    } = request.body;
   let passportUrl =  request.body.hasOwnProperty('passportUrl') ? request.body.passportUrl : image;
    
    let pswd = bcrypt.hashSync(password, 10);
    const values = [
      firstname,
      lastname,
      email,
      phone,
      passportUrl,
      pswd,
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
        const user = { firstname, lastname, email, phone,
          passportUrl };

        return response.status(201)
          .json({
            status: 201,
            data: [{token: token, user: user}]

          });
      })
      .catch(error => response.status(500)
        .json({
          status: 400,
          error: "Your input is not valid, check and try again",
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
            const user = {
              firstname, lastname, email, phone,
            };
            response.status(200)
              .json({
                status: 200,
                data: [{token: token, user: user}]
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
