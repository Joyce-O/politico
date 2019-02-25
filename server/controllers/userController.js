import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import pool from '../database/dbConnection';
import { insertUser, queryUsersByEmail } from '../database/queries';
import { generateToken } from '../middlewares.js/authorization';
import { verifyPassword } from '../utilities.js/hashPassword';
import BufferStream from '../utilities.js/imgBufffer';

dotenv.config();
export default class UserController {
  static registerUser(request, response) {
    const {
      firstname, lastname, email, phone, password, address,
    } = request.body;

    const image = {};
    const stream = new BufferStream(request.file.buffer);

    stream.pipe(cloudinary.uploader.upload_stream((result) => {
      if (result !== undefined) {
        image.url = result.url;
        image.id = result.public_id;
      }
    }));

    setTimeout(() => {
      const passportUrl = image;
      if (JSON.stringify(passportUrl) === '{}') {
        response.status(400)
          .json({
            status: 400,
            error: 'Passport image upload failed, try again.',
          });
        return false;
      }

      const pswd = bcrypt.hashSync(password, 10);
      const values = [
        firstname,
        lastname,
        email,
        phone,
        passportUrl,
        address,
        pswd,
      ];
      pool.query(insertUser, values)
        .then((data) => {
          const { isadmin, id } = data.rows[0];
          const token = generateToken({
            isadmin, id, email, phone, passportUrl: passportUrl.url, firstname, lastname, address,
          });
          const user = { firstname, isadmin };

          return response.status(201)
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
    }, 10000);
  }

  static loginUser(request, response) {
    const isEmail = [request.body.email];
    pool.query(queryUsersByEmail, isEmail)
      .then((data) => {
        if (data.rowCount !== 0) {
          const isPassword = verifyPassword(request.body.password, data.rows[0].password);
          if (isPassword) {
            const {
              firstname, lastname, phone, email, passporturl, isadmin, id, address,
            } = data.rows[0];
            const passportUrl = passporturl.url;
            const token = generateToken({
              isadmin, id, email, phone, passportUrl, firstname, lastname, address,
            });
            const user = { firstname, isadmin };
            response.status(200)
              .json({
                status: 200,
                data: [{ token, user }],
              });
          } else {
            response.status(400)
              .json({
                status: 400,
                error: 'Sorry, the credentials you provided is incorrect. try again',
              });
          }
        }
      })
      .catch(error => response.status(500)
        .json({
          status: 'Fail',
          message: error.message,
        }));
  }
}
