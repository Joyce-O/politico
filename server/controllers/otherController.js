import pool from '../database/dbConnection';
import {
  insertCandidate, selectUsersById, selectAnOffice, selectAParty,
} from '../database/queries';

export default class PartyController {
  static createCandidate(request, response) {
    const {
      office, user, party,
    } = request.body;
    const duplicate = {};
    pool.query(selectUsersById, [user])
      .then((data) => {
        if (data.rowCount === 0) {
          duplicate.userNotExist = 'userId does not exist';
        }
      });

    pool.query(selectAnOffice, [office])
      .then((data) => {
        if (data.rowCount === 0) {
          duplicate.officeNotExist = 'officeId does not exist';
        }
      });
    pool.query(selectAParty, [party])
      .then((data) => {
        if (data.rowCount === 0) {
          duplicate.partyNotExist = 'partyId does not exist';
        }
      });

    const values = [office, user, party];
    pool.query(insertCandidate, values)
      .then((data) => {
        if (data.rowCount !== 0) {
          response.status(201)
            .json({
              status: 201,
              data: [{ message: 'Candidate is registered', data }],
            });
        }
      })
      .catch(error => response.status(500)
        .json({
          status: 500,
          data: [error.message],
        }));
  }
}
