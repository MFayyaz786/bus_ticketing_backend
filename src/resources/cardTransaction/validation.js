const Joi = require('@hapi/joi');

module.exports = {
  
  createCardTransactionValidation: Joi.object({
    cardNumber:Joi.string().required(),
    balance: Joi.number().required(),
    noOfTickets:Joi.number().optional(),
  }),

};
