const catchAsync = require('../../helpers/catchAsync');
const CardTransactionService = require('./service');
const {
  createCardTransactionValidation
} = require('./validation');
const AppError = require('../../helpers/appError');

exports.createTransaction = catchAsync(async (req, res, next) => { 
  const validate = createCardTransactionValidation.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error, 400));
  }

  const { cardTransaction } = await CardTransactionService.create(req.body,next);

  res.status(200).json({
    status: 'success',
    cardTransaction,
  });
  
});

exports.getAllTransactions = catchAsync(async (req, res) => {
  const { cardTransactions } = await CardTransactionService.getAll();

  res.status(200).json({
    status: 'success',
    results: cardTransactions.length,
    cardTransactions,
  });
});

exports.getSingleTransactions = catchAsync(async (req, res, next) => {
  const { cardTransaction } = await CardTransactionService.getSingle(req.params.id, next);

  res.status(200).json({
    status: 'success',
    cardTransaction,
  });
});

exports.getTransactionsByCard = catchAsync(async (req, res, next) => {
  const { cardTransactions } = await CardTransactionService.getAllByCard(req.params.cardNumber, next);

  res.status(200).json({
    status: 'success',
    cardTransactions,
  });
});

exports.updateTransactions = catchAsync(async (req, res, next) => {
  const validate = updateCardValidation.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error, 400));
  }

  const { updatedCard } = await CardTransactionService.Update(
    req.params.id,
    req.body,
    next
  );

  res.status(200).json({
    status: 'success',
    cardTransaction: updatedCard,
  });
});

exports.deleteTransactions = catchAsync(async (req, res, next) => {
  const { deletedCard } = await CardTransactionService.Delete(req.params.id, next);

  res.status(200).json({
    status: 'success',
    cardTransaction: deletedCard,
  });
});



