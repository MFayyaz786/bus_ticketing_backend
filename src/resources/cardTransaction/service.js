const CardTransaction = require('./model');
const Card = require('../card/model');
const AppError = require('../../helpers/appError');
const { v1: uuidv1 } = require('uuid');
// const code=require('../../helpers/generateCardTransactionNumber')


class CardTransactionServices {

  //* Create
  static async create(userData,next) {
    const { cardNumber, balance,noOfTickets} = userData;

    //* check card is active 
    const checkCard=await Card.findOne({cardNumber});
    if(checkCard.status==='inActive'){
      return next(new AppError(`Card is inActive`, 400));
    }

    // find card and update their balance also
    let updateCard=await Card.findOne({cardNumber});
    if (!updateCard) {
      return next(new AppError(`No card found with cardNumber: ${cardNumber}`, 404));
    }
    
    // cannot create transaction if card is not assigned 
    if (!updateCard.cnic) {
      return next(new AppError(`Cannot create transaction for card without CNIC: ${cardNumber}`, 400));
    }

    const cardTransactions = [];

    for (let i = 0; i < noOfTickets; i++) {
      const cardTransaction = await CardTransaction.create({
        cardNumber,
        balance,
      });
  
      // save transaction cnic also for a person with card only
      cardTransaction.cnic = updateCard.cnic;
      cardTransactions.push(cardTransaction);
    }
    updateCard.balance-=balance*noOfTickets
    
    // save transaction cnic also for a person with card only 

    await Promise.all(cardTransactions.map((t) => t.save()));
    await updateCard.save();

    return {cardTransactions}

  }

    
  static async getAll() {
    let cardTransactions =await CardTransaction.find().sort({ createdAt: -1 });
    return { cardTransactions };
  }

  static async getAllByCard(cardNumber) {
    let cardTransactions =await CardTransaction.find({cardNumber}).sort({ createdAt: -1 });
    return { cardTransactions };
  }

  static async getSingle(id, next) {
    const cardTransaction = await CardTransaction.findOne({_id:id});

    if (!cardTransaction){
      return next(new AppError(`CardTransaction not found`, 404));
    }

    return { cardTransaction };
  }

  static async Update(_id, body, next) {

    const updatedCardTransaction = await CardTransaction.findByIdAndUpdate(
      _id,
      { ...body },
      {
        runValidators: true,
        new: true,
      }
    );

    if (!updatedCardTransaction)
      return next(new AppError(`Can't find any card`, 404));

    return { updatedCardTransaction };
  }

  static async Delete(_id, next) {
    const deletedCardTransaction = await CardTransaction.findByIdAndDelete(_id);

    if (!deletedCardTransaction)
      return next(new AppError(`No CardTransaction found against id ${_id}`, 404));

    return { deletedCardTransaction };
  }


}

module.exports = CardTransactionServices;
