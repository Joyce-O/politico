import Joi from 'joi';

export const newUserSchema = Joi.object().keys({
  firstname: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid first name is required '),
  lastname: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid last name is required'),
  othername: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .label('A valid other name is required'),
  email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50)
    .required()
    .label('A valid email is required'),
  phone: Joi.number().integer().required().label('A valid phone number is required'),
  passportUrl: Joi.string().label('A valid passport is required'),
  password: Joi.string().alphanum().min(3).max(1000)
    .required()
    .label('A valid password is required')
});

export const loginSchema = {
  email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50)
    .required()
    .label('A valid email is required'),
  password: Joi.string().alphanum().min(3).max(1000)
    .required()
    .label('A valid password is required')
};

export const newPartySchema = Joi.object().keys({
  name: Joi.string().min(3).max(100).required()
    .label('A valid name is required'),
  acronym: Joi.string().max(10).required()
    .label('A valid acronym'),
  hqAddress: Joi.string().required().label('A valid address is required'),
  logoUrl: Joi.string().label('A valid logo image is required'),
  email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().label('A valid email is required'),
  phone: Joi.number().integer().required().label('A valid phone number is required')
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
