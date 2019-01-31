import pool from '../database/dbConnection';
import {
  queryPartiesByName, insertParty, selectAllParties, selectAParty, updatePartyName, deleteParty,
} from '../database/queries';


export default class PartyController {
  static createParty(request, response) {
    const {
      name, acronym, hqAddress, logoUrl, email, phone,
    } = request.body;
    const duplicate = {};
    pool.query(queryPartiesByName, [name])
      .then((data) => {
        if (data.rowCount !== 0) {
          duplicate.dupName = 'Name already exist';
        }
        if (data.rows[0].acronym === acronym) {
          duplicate.dupAcronym = 'Acronym already exist';
        }
        if (data.rows[0].email === email) {
          duplicate.dupEmail = 'Email already exist';
        }
        if (JSON.stringify(duplicate) !== '{}') {
          return response.status(409)
            .json({
              status: 409,
              error: duplicate,
            });
        }
      });

    const values = [
      name,
      acronym,
      hqAddress,
      logoUrl,
      email,
      phone,
    ];
    pool.query(insertParty, values)
      .then((data) => {
        const { registered } = data.rows[0].registered;
        const party = {
          name, acronym, hqAddress, email, phone, registered,
        };
        if (data.rowCount !== 0) {
          response.status(201)
            .json({
              status: 201,
              data: [{ message: 'Party is successful', party }],

            });
        }

        response.status(201)
          .json({
            status: 201,
            data: [{ message: 'Party is successful', party }],

          });
      })
      .catch(error => response.status(500)
        .json({
          status: 500,
          data: [error.message],
        }));
  }

  static getAllParties(request, response) {
    pool.query(selectAllParties)
      .then((data) => {
        if (data.rowCount === 0) {
          return response.status(200)
            .json({
              status: 200,
              data: ['No registered party yet'],

            });
        }
        const partyList = data.rows;
        return response.status(200)
          .json({
            status: 200,
            data: [{ partyList }],
          });
      })
      .catch(error => response.status(500)
        .json({
          status: 500,
          error: error.message,
        }));
  }

  static getOneParty(request, response) {
    const { partyId } = request.params;
    if (!/[0-9]+$/.test(partyId)) {
      return response
        .json({
          status: 400,
          error: 'Invalid partyId',
        });
    }
    pool.query(selectAParty, [partyId])
      .then((data) => {
        if (data.rowCount === 0) {
          response.status(404)
            .json({
              status: 404,
              error: 'party does not exist',
            });
          return false;
        }
        const party = data.rows;
        return response.status(200)
          .json({
            status: 200,
            data: [{ party }],
          });
      })
      .catch(error => response.status(500)
        .json({
          status: 500,
          error: error.message,
        }));
  }

  static editParty(request, response) {
    const { partyId } = request.params;
    const { name } = request.body.name;
    if (!/[0-9]+$/.test(partyId)) {
      return response
        .json({
          status: 400,
          error: 'Invalid partyId',
        });
    }
    pool.query(selectAParty, [partyId])
      .then((data) => {
        if (data.rowCount === 0) {
          response.status(404)
            .json({
              status: 404,
              error: 'Party does not exist',
            });
          return false;
        }
      });
    pool.query(queryPartiesByName, [name])
      .then((data) => {
        if (data.rowCount !== 0) {
          response.status(400)
            .json({
              status: 400,
              error: 'Name already exist',
            });
          return false;
        }
      });
    pool.query(updatePartyName, [name, partyId])
      .then((result) => {
        const party = result.rows;
        return response.status(200)
          .json({
            status: 200,
            data: [{ message: 'Party name updated', party }],
          })
          .catch(error => response.status(500)
            .json({
              status: 500,
              error: error.message,
            }));
      });
  }

  static deleteParty(request, response) {
    const { partyId } = request.params;
    if (!/[0-9]+$/.test(partyId)) {
      return response
        .json({
          status: 400,
          error: 'Invalid partyId',
        });
    }
    pool.query(selectAParty, [partyId])
      .then((data) => {
        if (data.rowCount === 0) {
          response.status(404)
            .json({
              status: 404,
              error: 'Party does not exist',
            });
          return false;
        }
      });
    pool.query(deleteParty, [partyId])
      .then(data => response.status(200)
        .json({
          status: 200,
          data: ['This order is deleted', data],
        })
        .catch(error => response.status(500)
          .json({
            status: 500,
            error: error.message,
          })));
  }
}
