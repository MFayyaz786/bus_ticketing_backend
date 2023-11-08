const mongoose = require('mongoose');

const cardTransactionSchema = new mongoose.Schema({
    // cardId:{
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     ref: 'Card'
    // },
    cnic:{
        type: String,
    },
    cardNumber: {
        type: String,
        required: [true, 'cardNumber is required!'],
    },
    balance: {
        type: Number,
        required: true
    },
  },
  {
    timestamps: true,
});


const CardTransaction = mongoose.model('CardTransaction', cardTransactionSchema);
module.exports = CardTransaction;
