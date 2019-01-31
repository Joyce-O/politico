import pool from '../database/dbConnection';
import {
  selectCanById, insertCandidate, selectUsersById, selectAnOffice, selectAParty,
} from '../database/queries';

export default class OtherController {
  static createCandidate(request, response) {
    const {
      office, user_id, party,
    } = request.body;
    const duplicate = {};
    pool.query(selectUsersById, [user_id])
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
        if (JSON.stringify(duplicate) !== '{}') {
          return response.status(409)
            .json({
              status: 409,
              error: duplicate,
            });
        }
      });

    const values = [office, user_id, party];
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

  static castVote(request, response) {
    const {
      createBy, office, candidate,
    } = request.body;
    const duplicate = {};
    pool.query(selectUsersById, [createBy])
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
    pool.query(selectCanById, [candidate])
      .then((data) => {
        if (data.rowCount === 0) {
          duplicate.candidateNotExist = 'candidate does not exist';
        }
        if (JSON.stringify(duplicate) !== '{}') {
          return response.status(409)
            .json({
              status: 409,
              error: duplicate,
            });
        }
      });

    const values = [createBy, office, candidate];
    pool.query(insertCandidate, values)
      .then((data) => {
        if (data.rowCount !== 0) {
          const voter = data.rows;
          response.status(201)
            .json({
              status: 201,
              data: [{ message: 'Candidate is registered', voter }],
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
