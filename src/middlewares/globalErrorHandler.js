const AppError = require('../helpers/appError');

//*
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

//*
const handleDuplicateFieldsDB = (err) => {

  // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log('err', err)
  const value =err && err.errmsg.match(/(["'])(\\?.)*?\1/)?.[0]?.replace(/"/g, '');

  console.log(value);

  const message = `Duplicate field  value : ${value}. Please use another value!`;
  return new AppError(message, 400);
};

//*
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

//*
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

  // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥💥💥', err);

  // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  console.log('ERR CAUGHT IN GLOBAL MIDDLEWARE'.red.bold);
  console.log(`ERR ${err}`.brightRed.bgBrightWhite.bold);  

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
// module.exports=(async(err, req, res, next) => {
//   console.log(err);
//   if (err && err.code === 11000) {
//     let errorKey = Object.keys(err["keyPattern"]).toString();
//     errorKey = uc.upperCaseFirst(errorKey);
//     return res.status(400).send({ msg: errorKey + " already exists" });
//   }
//   if (err.name === "ValidationError") {
//     const firstErrorKey = Object.keys(err.errors)[0];
//     return res.status(400).send({ msg: err.errors[firstErrorKey].message });
//     // res.status(400).send({
//     //   msg: Object.values(err.errors).map((val) => val.message),
//     // });
//   } else {
//     return res.status(400).send({ msg: err.message });
//   }
// });