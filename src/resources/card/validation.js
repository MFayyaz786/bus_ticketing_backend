const Joi = require('@hapi/joi');

module.exports = {
    createCardValidation: Joi.object({
    cardHolder: Joi.string().trim().hex().length(24).optional(),
    cardNumber:Joi.string().required(),
    balance: Joi.number(),
    activationDate: Joi.date().optional(),
    expirationDate: Joi.date().optional(),
    cnic:Joi.string().optional(),
    status: Joi.string().valid('active', 'inActive').optional(),
    state: Joi.string().valid('digital', 'physical').optional(),
    // qrCode:Joi.string().trim().required()
  }),
  
  updateCardValidation: Joi.object({
    cardHolder: Joi.string().trim().hex().length(24).optional(),
    cardNumber:Joi.string().optional(),
    balance: Joi.forbidden().error(() => {
      return new Error('Balance field is not allowed in update');
    }),
    activationDate: Joi.date().optional(),
    expirationDate: Joi.date().optional(),
    cnic:Joi.string().optional(),
    status: Joi.string().valid('active', 'inActive').optional(),
    // qrCode:Joi.string().trim().optional()
  }),

};
