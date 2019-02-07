import pool from '../database/dbConnection';
import {
  queryOfficesByName, insertOffice, selectAllOffices, selectAnOffice,
} from '../database/queries';


export default class OfficeController {
  static createOffice(request, response) {
    const {
      name, type, ageLimit, basicQual,
    } = request.body;
    pool.query(queryOfficesByName, [name])
      .then((data) => {
        if (data.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 409,
              error: 'Name already exist, please register with another name.',
            });
        }
        return false;
      });

    const values = [
      name,
      type.trim(),
      ageLimit,
      basicQual,
    ];
    pool.query(insertOffice, values)
      .then((data) => {
        response.status(201)
          .json({
            status: 201,
            message: 'Office is successfully registered',
            data: data.rows[0],

          });
      })
      .catch(error => response.status(500)
        .json({
          status: 400,
          error: "our input is not valid, check and try again",
        }));
  }

  static getAllOffices(request, response) {
    pool.query(selectAllOffices)
      .then((data) => {
        if (data.rowCount === 0) {
          return response.status(404)
            .json({
              status: 404,
              error: 'No registered office yet',

            });
        }
        const officeList = data.rows;
        return response.status(200)
          .json({
            status: 200,
            message: 'offices fetched successfully',
            data: officeList,
          });
      })
      .catch(error => response.status(500)
        .json({
          status: 400,
          error: "our input is not valid, check and try again",
        }));
  }

  static getAnOffice(request, response) {
    const { officeId } = request.params;
    if (!/[0-9]+$/.test(officeId)) {
      return response
        .json({
          status: 400,
          error: 'Invalid officeId',
        });
    }
    pool.query(selectAnOffice, [officeId])
      .then((data) => {
        if (data.rowCount === 0) {
          response.status(404)
            .json({
              status: 404,
              error: 'office does not exist',
            });
          return false;
        }
        const office = data.rows;
        return response.status(200)
          .json({
            status: 200,
            data: office,
          });
      })
      .catch(error => response.status(500)
        .json({
          status: 400,
          error: "our input is not valid, check and try again",
        }));
  }
}
