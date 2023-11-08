const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path');
// const cookieSession = require('cookie-session');
// const request = require('request');

const app = express();

const authRouter = require('./src/resources/auth/router');
const userRouter = require('./src/resources/user/router');
const userTransactionRouter = require('./src/resources/userTransaction/router');
const cardRouter = require('./src/resources/card/router');
const cardTransactionRouter = require('./src/resources/cardTransaction/router');
const openTicketRouter = require('./src/resources/openTicket/router');

const globalErrorHandler = require('./src/middlewares/globalErrorHandler');
const AppError = require('./src/helpers/appError');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use((req, res, next) => {
  console.log(`Route called: ${req.originalUrl}`);
  next();
});
app.get("/", (req, res, next) => {
  res.send({ msg: "Welcome To Ticketing-System " });
  next();
});
app.use(express.json());
app.use(morgan("dev"));
// set security http headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// $ CORS
app.use(cors());

//* this will go to env
// clients=["https://rei-client.herokuapp.com","http://rei-client.herokuapp.com", "https://app.reithinkmedia.com"]

// var corsOptions = {
//   origin: JSON.parse(process.env.clients),
//   optionsSuccessStatus: 200,
//   methods: "GET, POST, DELETE, PUT",
// };
// app.use(cors(corsOptions));

//  set limit request from same API in timePeroid from same ip
// const limiter = rateLimit({
//   max: 100, //   max number of limits
//   windowMs: 60 * 60 * 1000, // hour
//   message: ' Too many req from this IP , please Try  again in an Hour ! ',
// });

// app.use('/api', limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc
// app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); //   filter out the dollar signs protect from  query injection attact

// Data sanitization against XSS
app.use(xss()); //    protect from molision code coming from html

// routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/userTransaction', userTransactionRouter);
app.use('/api/v1/card', cardRouter);
app.use('/api/v1/cardTransaction', cardTransactionRouter);
app.use('/api/v1/openTicket', openTicketRouter);

//404 handler
app.use((req, res, next) => {
  res.status(404).send({ msg: "Route Not found" });
  return;
});
// handling all (get,post,update,delete.....) unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// error handling middleware
app.use(globalErrorHandler);

module.exports = app;
