import Joi from 'joi';
import { newPartySchema } from '../utilities.js/inputSchema';

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
    return next();
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
