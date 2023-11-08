const UserTransaction = require('./model');
const Card = require('../card/model');
const AppError = require('../../helpers/appError');
const { v1: uuidv1 } = require('uuid');
// const code=require('../../helpers/generateUserTransactionNumber')


class UserTransactionServices {

  static async create(userData,id,next) {
    const { cardNumber, balance} = userData;

    //* make sure card is active
    const active=await Card.findOne({cardNumber,status:'active'});
    if (!active) {
      return next(new AppError(`Card is not active`, 400));
    }

    const userTransaction = await UserTransaction.create({
      userId:id,
      cardNumber,
      balance,
    });

    // find card and update their balance also
    let updateCard=await Card.findOne({cardNumber});
    if (!updateCard) {
      return next(new AppError(`No card found with cardNumber: ${cardNumber}`, 400));
    }
    updateCard.balance+=balance
    updateCard.save()

    return {userTransaction}
  }

    
  static async getAll() {
    let userTransactions =await UserTransaction.find().sort({ createdAt: -1 });
    return { userTransactions };
  }

  static async getAllByCard(cardNumber) {
    let userTransactions =await UserTransaction.find({cardNumber}).sort({ createdAt: -1 });
    return { userTransactions };
  }

  static async getSingle(id, next) {
    const userTransaction = await UserTransaction.findOne({_id:id});

    if (!userTransaction){
      return next(new AppError(`UserTransaction not found`, 404));
    }

    return { userTransaction };
  }

  static async Update(_id, body, next) {

    const updatedUserTransaction = await UserTransaction.findByIdAndUpdate(
      _id,
      { ...body },
      {
        runValidators: true,
        new: true,
      }
    );

    if (!updatedUserTransaction)
      return next(new AppError(`Can't find any card`, 404));

    return { updatedUserTransaction };
  }

  static async Delete(_id, next) {
    const deletedUserTransaction = await UserTransaction.findByIdAndDelete(_id);

    if (!deletedUserTransaction)
      return next(new AppError(`No UserTransaction found against id ${_id}`, 404));

    return { deletedUserTransaction };
  }


}

module.exports = UserTransactionServices;
