import Joi from 'joi';
// import pool from '../database/dbConnection';
import { newPartySchema } from '../utilities.js/inputSchema';
// import { queryPartiesByEmail } from '../database/queries';

export default class PartyValidation {
  static handleCreateParty(request, response, next) {
    const { error } = Joi.validate(request.body, newPartySchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          status: 400,
          error: error.details.map(d => d.context),
        });
      return false;
    }
    // const duplicate = {};
    // const { email, name, acronym } = request.body;
    // pool.query(queryPartiesByEmail, [email])
    //   .then((data) => {
    //     if (data.rows[0].name === name) {
    //       duplicate.dupName = 'Name already exist';
    //     }
    //     if (data.rows[0].acronym === acronym) {
    //       duplicate.dupAcronym = 'Acronym already exist';
    //     }
    //     if (data.rowCount !== 0) {
    //       duplicate.dupEmail = 'Email already exist';
    //     }

    //     if (JSON.stringify(duplicate) !== '{}') {
    //       return response.status(409)
    //         .json({
    //           status: 409,
    //           error: duplicate,
    //         });
    //       // return false;
    //     }
    //   });
    // request.body.name = name;
    // request.body.email = email;
    // request.body.acronym = acr
    next();
  }

  static handleEditParty(request, response, next) {
    const { name } = request.body;
    if (!name || name.length < 10) {
      response.status(400)
        .json({
          status: 400,
          error: 'Please enter valid name of min. 10 characters',
        });
      return false;
    }
    return next();
  }
}
