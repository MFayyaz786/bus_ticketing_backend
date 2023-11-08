const mongoose = require('mongoose');

const userTransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // cardId:{
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     ref: 'Card'
    // },
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




const UserTransaction = mongoose.model('UserTransaction', userTransactionSchema);
module.exports = UserTransaction;
