const Card = require('./model');
const AppError = require('../../helpers/appError');
const { v1: uuidv1 } = require('uuid');
const code=require('../../helpers/generateCardNumber')


class CardServices {

  static async create(userData,id) {
    
    const {cardNumber,cardHolder,cnic, balance, activationDate,expirationDate,status,qrCode } = userData;

    // generate cardNumber 
    // let uniqueCode=code()

    const card = await Card.create({
      cardIssuer:id,
      cardHolder,
      cardNumber,
      balance,
      cnic,
      activationDate,
      expirationDate,
      status,
      // qrCode
    });
    return {card}

  }

    
  static async Cards(role) {

    let cards
    if(role==='admin'){
      cards =await Card.find().sort({ createdAt: -1 });
    }else{
      cards =await Card.find({status:'active'}).sort({ createdAt: -1 });
    }
    return { cards };
  }

  static async Card(cardId,role, next) {
    let card
    if(role==='admin'){
      card = await Card.findOne({_id:cardId});
    }else{
      card = await Card.findOne({_id:cardId,status:'active'});
    }

    if (!card){
      return next(new AppError(`Card not found`, 404));
    }

    return { card };
  }

  static async CardNo(cardNo,role, next) {
    let card
    if(role==='admin'){
       card = await Card.findOne({cardNumber:cardNo});
      }else{
      card = await Card.findOne({cardNumber:cardNo,status:'active'});
    }
    
    if (!card){
      return next(new AppError(`Can't find any card`, 404));
    }

    return { card };
  }

  static async CardByCardHolder(user,next) {
    const  card = await Card.findOne({cardHolder:user});
   
    if (!card){
      return next(new AppError(`Can't find any card`, 404));
    }

    return { card };
  }


  //* Attach

  static async AttachCard(body, next) {
    
  const {cardNumber,cnic}=body

  // check if card is active 
  let activeCard=await Card.findOne({cardNumber:cardNumber,status:'active'}).exec();
  if(activeCard){
    return next(new AppError(`Card is already active`, 400));
  }

  // check if cnic is already attached to any card
  let checkCnic=await Card.findOne({cnic:cnic}).exec();
  if(checkCnic){
    return next(new AppError(`Card is already registerd with a cnic use Different card`, 400));
  }

  // Check if card with the provided cardNumber exists and is inactive
  const card = await Card.findOne({ cardNumber: cardNumber, status: 'inActive' }).exec();
  if (!card) {
    return next(new AppError(`Can't find any card with the provided card number`, 404));
  }

  // check if the card have already cnic then validate that cnic if not then assign new cnic

  // Check if the provided CNIC matches the information on file for the card (optional)
  // if(card.cnic){
  //   if (cnic && card.cnic !== cnic) {
  //     return next(new AppError(`Provided CNIC doesn't match the information on file for the card`, 400));
  //   }
  // }

  card.cnic=cnic
  card.status='active'

  // Save the updated card instance to the database
  await card.save();
    
  return { card };

  }

// * Link

  static async linkCard(user,body, next) {

  const {cardNumber,cnic}=body

  // check if card is active 
  const activeCard=await Card.findOne({cardNumber:cardNumber,status:'inActive'}).exec();
  if(activeCard){
    return next(new AppError(`Card is inActive`, 400));
  }

  // find card and verify cnic
  const card=await Card.findOne({cardNumber:cardNumber,cnic:cnic}).exec();
  if(!card){
    return next(new AppError(`Card is not registerd with this cnic`, 400));
  }

  // Update the card's cardHolder property to reference the user's ID
  card.cardHolder = user;

  await card.save();
    
  return { card };
  
}


  static async UpdateByCardNo(cardNo, body, next) {

    console.log('body', body)

    const updatedCard = await Card.findOneAndUpdate(
      {cardNumber:cardNo},
      { ...body },
      {
        runValidators: true,
        new: true,
      }
    );

    if (!updatedCard){
      return next(new AppError(`Can't find any card`, 404));
    }

    return { updatedCard };
  }

  static async UpdateCard(_id, body, next) {
    
    // check card is inactive
    const card = await Card.findById(_id);
    if (!card) {
        return next(new AppError(`Can't find any card`, 404));
      }
    if (card.status !== 'inactive') {
        return next(new AppError(`The card must be inactive to update it`, 400));
      }

    const updatedCard = await Card.findByIdAndUpdate(
      _id,
      { ...body },
      {
        runValidators: true,
        new: true,
      }
    );

    if (!updatedCard)
      return next(new AppError(`Can't find any card`, 404));

    return { updatedCard };
  }


  static async DeleteCard(_id, next) {
    const deletedCard = await Card.findByIdAndDelete(_id);

    if (!deletedCard)
      return next(new AppError(`No Card found against id ${_id}`, 404));

    return { deletedCard };
  }


}

module.exports = CardServices;
