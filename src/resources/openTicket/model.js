const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance:{
    type:Number,
  },
  noOfTickets:{
    type:Number
  },
  total:{
    type:Number
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;