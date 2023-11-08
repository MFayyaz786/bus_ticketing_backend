const catchAsync = require('../../helpers/catchAsync');
const CardServices = require('./service');
const {
  createCardValidation,
  updateCardValidation
} = require('./validation');
const AppError = require('../../helpers/appError');



exports.createCard = catchAsync(async (req, res, next) => {
  const validate = createCardValidation.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error, 400));
  }

  console.log('req.body', req.body);
  
  const { card } = await CardServices.create(req.body,req.user._id);

  res.status(200).json({
    status: 'success',
    card,
  });
});

// admin
exports.getAllCards = catchAsync(async (req, res) => {
  const { cards } = await CardServices.Cards(req.user.role);

  res.status(200).json({
    status: 'success',
    results: cards.length,
    cards,
  });
});


exports.getSingleCard = catchAsync(async (req, res, next) => {
  const { card } = await CardServices.Card(req.params.id,req.user.role, next);

  res.status(200).json({
    status: 'success',
    card,
  });
});

exports.getCardbyCardNo = catchAsync(async (req, res, next) => {
  const { card } = await CardServices.CardNo(req.params.cardNo,req.user.role, next);

  res.status(200).json({
    status: 'success',
    card,
  });
  
});

exports.getCardbyCardHolder = catchAsync(async (req, res, next) => {
  
  const { card } = await CardServices.CardByCardHolder(req.user._id, next);

  res.status(200).json({
    status: 'success',
    card,
  });

});

exports.attachCard = catchAsync(async (req, res, next) => {
  const { card } = await CardServices.AttachCard(req.body, next);

  res.status(200).json({
    status: 'success',
    card,
  });

});

exports.linkCard = catchAsync(async (req, res, next) => {
  console.log('req',req.user);
  const { card } = await CardServices.linkCard(req.user._id,req.body, next);

  res.status(200).json({
    status: 'success',
    card,
  });
});

exports.updateCardbyCardNo = catchAsync(async (req, res, next) => {
  const validate = updateCardValidation.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error, 400));
  }

  const { updatedCard } = await CardServices.UpdateByCardNo(req.params.cardNo,req.body, next);

  res.status(200).json({
    status: 'success',
    card:updatedCard,
  });
});

exports.updateCard = catchAsync(async (req, res, next) => {
  const validate = updateCardValidation.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error, 400));
  }

  const { updatedCard } = await CardServices.UpdateCard(
    req.params.id,
    req.body,
    next
  );

  res.status(200).json({
    status: 'success',
    card: updatedCard,
  });
});

// admin

exports.deleteCard = catchAsync(async (req, res, next) => {
  const { deletedCard } = await CardServices.DeleteCard(req.params.id, next);

  res.status(200).json({
    status: 'success',
    card: deletedCard,
  });
});



