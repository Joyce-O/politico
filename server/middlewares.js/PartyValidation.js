import Joi from 'joi';
import pool from '../database/dbConnection';
import { newPartySchema } from '../utilities.js/inputSchema';
import { queryPartiesByEmail, queryPartiesByName, queryPartiesByAcronym  } from '../database/queries';

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
    pool.query(queryPartiesByName, [request.body.name])
      .then((result) => {
        if (result.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 409,
              error: 'Sorry the name aready exist, register with another name.',
            });
        }
      });
    pool.query(queryPartiesByAcronym, [request.body.acronym])
      .then((result) => {
        if (result.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 409,
              error: 'Sorry the acronym aready exist, register with another acronym.',
            });
        }
      });

    pool.query(queryPartiesByEmail, [request.body.email])
      .then((result) => {
        if (result.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 409,
              error: 'Sorry the email aready exist, register with another email.',
            });
        }
      });
    
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
