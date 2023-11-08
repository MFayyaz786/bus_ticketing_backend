const express = require('express');
const Controller = require('./controller');
const protect = require('../../middlewares/protect');
const restrictTo = require('../../middlewares/restrictTo');

const router = express.Router();

router
  .route('/')
  .post(protect, Controller.createTransaction)
  .get(protect, Controller.getAllTransactions);

router
  .route('/bycard/:cardNumber')
  .get(protect,Controller.getTransactionsByCard)

router
  .route('/:id')
  .get(protect, Controller.getSingleTransactions)
  .patch(protect,Controller.updateTransactions)
  .delete(protect,  Controller.deleteTransactions);

module.exports = router;
