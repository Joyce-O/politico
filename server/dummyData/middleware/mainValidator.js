import Joi from 'joi';
import partyModel from '../jsObjects/partyModel';
import { newPartySchema, idSchema } from './inputModel';

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

  static getPartyHelper(request, response, next) {
    const { partyId } = request.params;
    const { error } = Joi.validate(request.params, idSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          success: false,
          message: error.details.map(d => d.message)
        });
      return false;
    }
    const partyExist = partyModel.find(party => party.id === Number(partyId));
    if (partyExist === undefined) {
      response.status(404)
        .json({
          success: false,
          message: 'party does not exist',
        });
      return false;
    }
    request.body = partyExist;
    next();
  }

  static editPartyHelper(request, response, next) {
    const { partyId } = request.params;
    const { name } = request.body;
    const errors = {};

    if (!name || name.length < 10) {
      errors.name = 'Please enter valid name of min. 10 characters';
    }
    const { error } = Joi.validate(request.params, idSchema, { abortEarly: false });
    if (error !== null) {
      errors.partyId = error.details.map(d => d.message);
      return false;
    }
    if (JSON.stringify(errors) !== '{}') {
      response.status(400)
        .json({
          success: false,
          message: errors,
        });
      return false;
    }

    const partyExist = partyModel.find(party => party.id === Number(partyId));
    const dupName = partyModel.find(party => party.name === name);

    if (partyExist === undefined) {
      response.status(404)
        .json({
          success: false,
          message: 'Party does not exist',
        });
      return false;
    }
    if (dupName !== undefined) {
      response.status(409)
        .json({
          success: false,
          message: 'Name already exist',
        });
      return false;
    }
    partyExist.name = request.body.name;
    request.body = partyExist;
    next();
  }
}

const {
  newPartyHelper, getPartyHelper, editPartyHelper
} = mainValidator;
export { newPartyHelper, getPartyHelper, editPartyHelper };
