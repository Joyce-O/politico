import Joi from 'joi';
import partyObj from '../dummyData/partyObj';
import officeObj from '../dummyData/officeObj';
import {
  newPartySchema, idSchema, newOfficeSchema, officeIdSchema
} from '../inputSchema';

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
    const dupEmail = partyObj.find(party => party.email === email);
    const dupName = partyObj.find(party => party.name === name);

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
    const partyExist = partyObj.find(party => party.id === Number(partyId));
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

    const partyExist = partyObj.find(party => party.id === Number(partyId));
    const dupName = partyObj.find(party => party.name === name);

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

  static newOfficeHelper(request, response, next) {
    const { name } = request.body;
    const { error } = Joi.validate(request.body, newOfficeSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          success: false,
          message: error.details.map(d => d.message)
        });
      return false;
    }
    const dupName = officeObj.find(office => office.name === name);

    if (dupName !== undefined) {
      response.status(409)
        .json({
          success: false,
          message: 'name already exist'
        });
      return false;
    }
    next();
  }

  static getOfficeHelper(request, response, next) {
    const { officeId } = request.params;
    const { error } = Joi.validate(request.params, officeIdSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          success: false,
          message: error.details.map(d => d.message)
        });
      return false;
    }
    const officeExist = officeObj.find(office => office.id === Number(officeId));
    if (officeExist === undefined) {
      response.status(404)
        .json({
          success: false,
          message: 'office does not exist',
        });
      return false;
    }
    request.body = officeExist;
    next();
  }
}


export default mainValidator;
