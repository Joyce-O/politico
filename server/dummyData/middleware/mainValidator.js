import Joi from 'joi';
import partyModel from '../jsObjects/partyModel';
import { newPartySchema } from './inputModel';

class mainValidator {
  static newPartyHelper(request, response, next) {
    const { email } = request.body;
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
    if (dupEmail !== undefined) {
      response.status(409)
        .json({
          success: false,
          message: 'Email already exist, please enter another email.'
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
