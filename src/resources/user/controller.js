const catchAsync = require('../../helpers/catchAsync');
const UserServices = require('./service');
const {
  updateValidation,
} = require('./validation');
const AppError = require('../../helpers/appError');

exports.setMe = catchAsync(async (req, res, next) => {
  // console.log(`req.headers.origin`, req.headers.origin);
  req.params.id = req.user._id;
  next();
});

// admin
exports.getAllUsers = catchAsync(async (req, res) => {
  const { users } = await UserServices.Users(req.query);

  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

exports.getMe = catchAsync(async (req, res) => {
  const { user } = await UserServices.Me(req.user._id);

  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { user } = await UserServices.User(req.params._id, next);

  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const validate = updateValidation.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error, 400));
  }

  const { updatedUser } = await UserServices.UpdateMe(
    req.user._id,
    req.body,
    next
  );

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
  
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const validate = updateValidation.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error, 400));
  }

  const { updatedUser } = await UserServices.UpdateMe(
    req.user._id,
    req.body,
    next
  );

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});

// admin only

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { deletedUser } = await UserServices.DeleteUser(req.params._id, next);

  res.status(200).json({
    status: 'success',
    user: deletedUser,
  });
});

