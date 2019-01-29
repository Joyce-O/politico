import Joi from 'joi';
import offices from '../dummyData/offices';
import { newOfficeSchema } from '../inputSchema';

export class officeValidation {
  static handleNewOffice(request, response, next) {
    const { name } = request.body;
    const { error } = Joi.validate(request.body, newOfficeSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          status: 400,
          error: error.details.map(d => d.message)
        });
      return false;
    }
    const dupName = offices.find(office => office.name === name);

    if (!dupName) {
      response.status(409)
        .json({
          status: 409,
          error: 'name already exist'
        });
      return false;
    }
    next();
  }
}
  