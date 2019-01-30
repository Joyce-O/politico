import Joi from 'joi';
import { newOfficeSchema } from '../utilities/inputSchema';

export default class OfficeValidation {
  static handleNewOffice(request, response, next) {
    const { error } = Joi.validate(request.body, newOfficeSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          status: 400,
          error: error.details.map(d => d.context)
        });
      return false;
    }

    next();
  }
}
