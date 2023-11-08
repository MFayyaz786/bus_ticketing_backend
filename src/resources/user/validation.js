const Joi = require('@hapi/joi');

module.exports = {
  updateValidation: Joi.object({
    firstName: Joi.string().trim().max(20).min(2),
    lastName: Joi.string().trim().max(20).min(2),
    email: Joi.string().trim().email(),
    role: Joi.string().trim(),
    phone: Joi.number(),
  }),

};
