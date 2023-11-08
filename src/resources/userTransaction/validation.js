const Joi = require('@hapi/joi');

module.exports = {
  
  createUserTransactionValidation: Joi.object({
    cardNumber:Joi.string().required(),
    balance: Joi.number().required(),
  }),

};
