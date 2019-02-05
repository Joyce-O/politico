import pool from '../database/dbConnection';
import {
  selectCanById, insertCandidate, selectUsersById, selectAnOffice, selectAParty,
  insertVote, selectCanId, resultQuery,
} from '../database/queries';

export default class OtherController {
  static createCandidate(request, response) {
    const {
      age, qualification, office, userId, party,
    } = request.body;
    const duplicate = {};
    pool.query(selectUsersById, [userId])
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
        return false;
      });
    pool.query(selectCanById, [userId])
      .then((data) => {
        if (data.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 409,
              error: 'candidate cannot apply twice',
            });
        }
        return false;
      });

    const values = [age, qualification.trim(), userId, office, party];
    pool.query(insertCandidate, values)
      .then((data) => {
        if (data.rowCount !== 0) {
          const candidate = data.rows[0];
          response.status(201)
            .json({
              status: 201,
              message: 'Thank you! Application is successful.',
              data: candidate,
            });
        }
      })
      .catch(error => response.status(500)
        .json({
          status: 500,
          error: error.message,
        }));
  }

  static castVote(request, response) {
    const {
      voter, office, candidate,
    } = request.body;
    const duplicate = {};
    pool.query(selectUsersById, [voter])
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
    pool.query(selectCanId, [candidate])
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
        return false;
      });


    const values = [voter, office, candidate];
    pool.query(insertVote, values)
      .then((data) => {
        if (data.rowCount !== 0) {
          const voter2 = data.rows[0];
          response.status(201)
            .json({
              status: 201,
              message: 'Candidate is registered',
              data: voter2,
            });
        }
      })
      .catch(error => response.status(500)
        .json({
          status: 500,
          error: error.message,
        }));
  }

  static result(request, response) {
    const { officeId } = request.params;
    pool.query(selectAnOffice, [officeId])
      .then((data) => {
        if (data.rowCount === 0) {
          response.status(201)
            .json({
              status: 404,
              error: 'office does not exist, please check your input and try again ',
            });
        }
      });

    pool.query(resultQuery, [officeId])
      .then((data) => {
        if (data.rowCount !== 0) {
          const result = data.rows[0];
          response.status(200)
            .json({
              status: 200,
              message: 'Election results for this office',
              data: result,
            });
        }
      });
  }
}
