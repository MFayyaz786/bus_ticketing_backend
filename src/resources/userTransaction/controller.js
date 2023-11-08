const catchAsync = require('../../helpers/catchAsync');
const UserTransactionService = require('./service');
const {
  createUserTransactionValidation
} = require('./validation');
const AppError = require('../../helpers/appError');

exports.createTransaction = catchAsync(async (req, res, next) => { 
  const validate = createUserTransactionValidation.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error, 400));
  }

  const { userTransaction } = await UserTransactionService.create(req.body,req.user._id,next);

  res.status(200).json({
    status: 'success',
    userTransaction,
  });
  
});

exports.getAllTransactions = catchAsync(async (req, res) => {
  const { userTransactions } = await UserTransactionService.getAll();

  res.status(200).json({
    status: 'success',
    results: userTransactions.length,
    userTransactions,
  });
});

exports.getSingleTransactions = catchAsync(async (req, res, next) => {
  const { userTransaction } = await UserTransactionService.getSingle(req.params.id, next);

  res.status(200).json({
    status: 'success',
    userTransaction,
  });
});

exports.getTransactionsByCard = catchAsync(async (req, res, next) => {
  const { userTransactions } = await UserTransactionService.getAllByCard(req.params.cardNumber, next);

  res.status(200).json({
    status: 'success',
    userTransactions,
  });
});

exports.updateTransactions = catchAsync(async (req, res, next) => {
  const validate = updateCardValidation.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error, 400));
  }

  const { updatedCard } = await UserTransactionService.Update(
    req.params.id,
    req.body,
    next
  );

  res.status(200).json({
    status: 'success',
    userTransaction: updatedCard,
  });
});

exports.deleteTransactions = catchAsync(async (req, res, next) => {
  const { deletedCard } = await UserTransactionService.Delete(req.params.id, next);

  res.status(200).json({
    status: 'success',
    userTransaction: deletedCard,
  });
});



