import Joi from 'joi';

export const newUserSchema = Joi.object().keys({
  firstname: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid first name '),
  lastname: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid last name'),
  othername: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .label('A valid other name'),
  email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50)
    .label('A valid email'),
  phone: Joi.number().integer().required().label('A valid phone number'),
  passportUrl: Joi.string().label('A valid passport'),
  password: Joi.string().alphanum().min(3).max(1000)
    .required()
    .label('A valid password')
});

export const loginSchema = {
  email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50)
    .required()
    .label('A valid email'),
  password: Joi.string().alphanum().min(3).max(1000)
    .required()
    .label('A valid password')
};

export const newPartySchema = Joi.object().keys({
  name: Joi.string().min(3).max(100).required()
    .label('A valid name'),
  acronym: Joi.string().max(10).required()
  .label('A valid name'),
  hqAddress: Joi.string().required().label('A valid address'),
  logoUrl: Joi.string().label('A valid logo image'),
  email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().label('A valid email'),
  phone: Joi.number().integer().required().label('A valid phone number')
});


export const editNameSchema = {
  name: Joi.string().min(3).max(100).required()
    .label('A valid name ')
};

export const newOfficeSchema = Joi.object().keys({
  name: Joi.string().min(5).max(100).required()
    .label('A valid name '),
  type: Joi.string().min(5).max(100).required()
    .label('A valid office type')
});
