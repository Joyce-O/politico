import pool from '../database/dbConnection';
import {
  queryPartiesByName, insertParty, selectAllParties, selectAParty,
  queryPartiesByEmail, updatePartyName, deleteParty, queryPartiesByAcronym,
} from '../database/queries';


export default class PartyController {
  static createParty(request, response) {
    const {
      name, acronym, hqAddress, logoUrl, email, phone,
    } = request.body;
    const values = [
      name,
      acronym,
      hqAddress,
      logoUrl,
      email,
      phone,
    ];
    pool.query(queryPartiesByName, [request.body.name])
      .then((result) => {
        if (result.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 409,
              message: 'Sorry the name aready exist, register with another name.',
            });
        }
      });
    pool.query(queryPartiesByAcronym, [request.body.acronym])
      .then((result) => {
        if (result.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 409,
              message: 'Sorry the acronym aready exist, register with another acronym.',
            });
        }
      });

    pool.query(queryPartiesByEmail, [request.body.email])
      .then((result) => {
        if (result.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 409,
              message: 'Sorry the email aready exist, register with another email.',
            });
        }
      });
    pool.query(insertParty, values)
      .then((data) => {
        if (data.rowCount !== 0) {
          const { id, createdOn } = data.rows[0];
          const party = {
            id, name, acronym, hqAddress, email, phone, createdOn,
          };

          return response.status(201)
            .json({
              status: 201,
              message: 'Party is successfully created',
              data: party,

            });
        }
      })
      .catch(error => response.status(500)
        .json({
          status: 400,
          data: [error.message],
        }));
  }

  static getAllParties(request, response) {
    pool.query(selectAllParties)
      .then((data) => {
        if (data.rowCount === 0) {
          return response.status(404)
            .json({
              status: 404,
              error: 'No registered party yet',

            });
        }
        const partyList = data.rows;
        return response.status(200)
          .json({
            status: 200,
            message: 'Parties fetched successfully',
            data: partyList,
          });
      })
      .catch(error => response.status(500)
        .json({
          status: 400,
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
            message: 'Party fetched successfully',
            data: party,
          });
      })
      .catch(error => response.status(500)
        .json({
          status: 400,
          error: error.message,
        }));
  }

  static editParty(request, response) {
    const { partyId } = request.params;
    const { name } = request.body;
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
            message: 'Party name has been updated',
            data: party,
          })
          .catch(error => response.status(500)
            .json({
              status: 400,
              error: error.message,
            }));
      });
  }

  static deleteParty(request, response) {
    const { partyId } = request.params;
    if (!/[0-9]+$/.test(partyId)) {
      response
        .json({
          status: 400,
          error: 'Invalid partyId',
        });
      return false;
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
          message: 'This order is deleted',
        }))
      .catch(error => response.status(500)
        .json({
          status: 400,
          error: error.message,
        }));
  }
}
