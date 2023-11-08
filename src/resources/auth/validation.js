const Joi = require('@hapi/joi');

module.exports = {
  signUpValidation: Joi.object({
    firstName:Joi.string().trim().required(),
    lastName:Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    role: Joi.string().trim().required(),
    phone:Joi.number().required(),
    password: Joi.string().trim().min(8).required(),
    passwordConfirm: Joi.string().trim().valid(Joi.ref('password')).required().error(() => {
      return new Error('Password confirmation must match password');
    }),
  }), 

  loginValidation: Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(8).required(),
  }),
  
};
