const Joi = require('@hapi/joi');

module.exports = {
  
  ticketValidation: Joi.object({
    balance:Joi.number().optional(),
    noOfTickets:Joi.number().required(),
  }),

};
