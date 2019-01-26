import Joi from 'joi';
import partyModel from '../jsObjects/partyModel';
import { newPartySchema } from './inputModel';

class mainValidator {
  static newPartyHelper(request, response, next) {
    const { email, name } = request.body;
    const { error } = Joi.validate(request.body, newPartySchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          success: false,
          message: error.details.map(d => d.message)
        });
      return false;
    }
    const dupEmail = partyModel.find(party => party.email === email);
    const dupName = partyModel.find(party => party.name === name);

    if (dupEmail !== undefined || dupName !== undefined) {
      response.status(409)
        .json({
          success: false,
          message: 'Email or name already exist'
        });
      return false;
    }
    next();
  }
}

const {
  newPartyHelper
} = mainValidator;
export default newPartyHelper;
