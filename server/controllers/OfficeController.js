import pool from '../database/dbConnection';
import {
  queryOfficesByName, insertOffice, selectAllOffices, selectAnOffice,
} from '../database/queries';


export default class OfficeController {
  static createOffice(request, response) {
    const {
      name, type,
    } = request.body;
    pool.query(queryOfficesByName, [name])
      .then((data) => {
        if (data.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 409,
              error: 'Name already exist',
            });
        }
      });

    const values = [
      name,
      type,
    ];
    pool.query(insertOffice, values)
      .then((data) => {
        const office = {
          name, type,
        };
        if (data.rowCount !== 0) {
          response.status(201)
            .json({
              status: 201,
              data: [{ message: 'Office is successful', office }],

            });
        }
      })
      .catch(error => response.status(500)
        .json({
          status: 500,
          error: [error.message],
        }));
  }

  static getAllOffices(request, response) {
    pool.query(selectAllOffices)
      .then((data) => {
        if (data.rowCount === 0) {
          return response.status(200)
            .json({
              status: 200,
              data: ['No registered office yet'],

            });
        }
        const officeList = data.rows;
        return response.status(200)
          .json({
            status: 200,
            data: [{ officeList }],
          });
      })
      .catch(error => response.status(500)
        .json({
          status: 500,
          error: error.message,
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
            data: [{ office }],
          });
      })
      .catch(error => response.status(500)
        .json({
          status: 500,
          error: error.message,
        }));
  }
}
