const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    cardIssuer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    cardHolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    cardNumber: {
      type: String,
      required: [true, 'cardNumber is required!'],
      unique: true
    },
    cnic:{
      type: String,
      unique: true,
      sparse: true
    },
    balance:{
      type:Number,
    },
    activationDate:{
      type:Date,
    },
    expirationDate:{
      type:Date,
    },
    status: {
      type: String,
      enum: ['active', 'inActive'],
      default:'inActive'
    },

    state:{
      type: String,
      enum:['digital', 'physical'],
      default:'physical'
    } 

  },
  {
    timestamps: true,
  }
);




const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
