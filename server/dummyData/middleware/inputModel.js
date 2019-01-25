import Joi from 'joi';

const newUserSchema = Joi.object().keys({
  firstname: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid first name '),
  lastname: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid last name'),
  othername: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid other name'),
  email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50)
    .label('A valid email'),
  phone: Joi.number().integer().required().label('A valid phone number'),
  passportUrl: Joi.string().label('A valid passport'),
  password: Joi.string().alphanum().min(3).max(1000)
    .required()
    .label('A valid password')
});

const loginSchema = {
  email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50)
    .required()
    .label('A valid email'),
  password: Joi.string().alphanum().min(3).max(1000)
    .required()
    .label('A valid password')
};

export {
  newUserSchema, loginSchema
};
