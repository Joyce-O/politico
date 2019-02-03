import Joi from 'joi';
import { newCandSchema, newVoteSchema } from '../utilities.js/inputSchema';

export default class OtherValidation {
  static handleCreateCandidate(request, response, next) {
    const { error } = Joi.validate(request.body, newCandSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          status: 400,
          error: error.details.map(d => d.context),
        });
      return false;
    }
    return next();
  }

  static handleVote(request, response, next) {
    const { error } = Joi.validate(request.body, newVoteSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          status: 400,
          error: error.details.map(d => d.context),
        });
      return false;
    }
    return next();
  }
}
