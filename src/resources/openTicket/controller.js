const catchAsync = require('../../helpers/catchAsync');
const TicketService = require('./service');
const {
    ticketValidation
} = require('./validation');
const AppError = require('../../helpers/appError');

exports.createTicket = catchAsync(async (req, res, next) => { 
  const validate = ticketValidation.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error, 400));
  }

  const { ticket } = await TicketService.create(req.body,req.user._id);

  res.status(200).json({
    status: 'success',
    ticket,
  });
  
});

exports.getAllTicket = catchAsync(async (req, res) => {
  const { tickets } = await TicketService.getAll();

  res.status(200).json({
    status: 'success',
    results: tickets.length,
    tickets,
  });
});

exports.getSingleTicket = catchAsync(async (req, res, next) => {
  const { ticket } = await TicketService.getSingle(req.params.id, next);

  res.status(200).json({
    status: 'success',
    ticket,
  });
});


exports.updateTicket = catchAsync(async (req, res, next) => {
  const validate = updateCardValidation.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error, 400));
  }

  const { updatedCard } = await TicketService.Update(
    req.params.id,
    req.body,
    next
  );

  res.status(200).json({
    status: 'success',
    ticket: updatedCard,
  });
});

exports.deleteTicket = catchAsync(async (req, res, next) => {
  const { deletedCard } = await TicketService.Delete(req.params.id, next);

  res.status(200).json({
    status: 'success',
    ticket: deletedCard,
  });
});



