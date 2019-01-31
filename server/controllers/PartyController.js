import pool from '../database/dbConnection';
import parties from '../dummyData/parties';
import {
  queryPartiesByName, insertParty, selectAllParties, selectAParty,
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
    const { name } = request.body;
    if (!Number(partyId) || !/^[0-9]+$/.test(partyId)) {
      response.status(400)
        .json({
          status: 400,
          error: 'Invalid partyId',
        });
      return false;
    }
    const party = parties.find(obj => obj.id === Number(partyId));
    const dupName = parties.find(obj => obj.name === name);

    if (party === undefined) {
      response.status(404)
        .json({
          status: 404,
          error: 'Party does not exist',
        });
      return false;
    }
    if (dupName !== undefined) {
      response.status(409)
        .json({
          status: 409,
          error: 'Name already exist',
        });
      return false;
    }
    party.name = name;
    return response.status(200)
      .json({
        status: 200,
        data: party,
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
    const index = parties.findIndex(obj => obj.id === Number(partyId));
    if (index === -1) {
      parties.splice(index, 1);
      response.status(404)
        .json({
          status: 404,
          error: 'party does not exist',
        });
    } else {
      response.status(200)
        .json({
          status: 200,
          data: parties,
        });
    }
  }
}