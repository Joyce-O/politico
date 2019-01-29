import Joi from 'joi';
import parties from '../dummyData/parties';
import { newPartySchema } from '../inputSchema';
import storeImage from '../utilities/storeImage';

export class partyValidation {
  static handleCreateParty(request, response, next) {
    const duplicate = {};
    const inputErrors = {};  
    const { email, name, acronym } = request.body;
    const { error } = Joi.validate(request.body, newPartySchema, { abortEarly: false });
    if (error !== null) {
          inputErrors = error.details.map(d => d.message)
          return false;
    }
    let logoUrl = storeImage(parties.length, request.file.originalname);
     if (!logoUrl) {
         inputErrors.logoUrl = 'Upload a valid image file'
         return false;
     }
     cloudinary.url("sample_remote.jpg");
     if (JSON.stringify(inputErrors) !== '{}') {
        response.status(400)
          .json({
            status: 400,
            errors: inputErrors,
          });
        return false;
    }
    const dupEmail = parties.find(party => party.email === email);
    const dupName = parties.find(party => party.name === name);
    const dupAcronym = parties.find(party => party.acronym === acronym);

    if (dupEmail !== undefined) {
        duplicate.dupEmail = 'Email already exist';
        return false;
    }
    if (dupName !== undefined) {
        duplicate.dupName = 'Name already exist';
        return false;
    }
    if (dupAcronym !== undefined) {
        duplicate.dupAcronym = 'Acronym; already exist';
        return false;
    }
    if (JSON.stringify(duplicate) !== '{}') {
        response.status(409)
          .json({
            status: 409,
            error: duplicate,
          });
        return false;
    }
    next();
    request.file = logoUrl;
  }

  static handleEditParty(request, response, next) {
    const { name } = request.body;

    if (!name || name.length < 10) {
      response.status(400)
        .json({
          status: 400,
          error: 'Please enter valid name of min. 10 characters'
        });
      return false;
    } 
    next();
  }
}