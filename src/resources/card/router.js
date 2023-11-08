const express = require('express');
const Controller = require('./controller');
const protect = require('../../middlewares/protect');
const restrictTo = require('../../middlewares/restrictTo');

const router = express.Router();

router
  .route('/')
  .post(protect, Controller.createCard)
  .get(protect, Controller.getAllCards);

router
  .route('/attach')
  .patch(protect, Controller.attachCard)

router
  .route('/link')
  .patch(protect, Controller.linkCard)

router
  .route('/cardHolder')
  .get(protect, Controller.getCardbyCardHolder)

router
  .route('/cardNo/:cardNo')
  .get(protect, Controller.getCardbyCardNo)
  .patch(protect, Controller.updateCardbyCardNo);

router
  .route('/:id')
  .get(protect, Controller.getSingleCard)
  .patch(protect,Controller.updateCard)
  .delete(protect,  Controller.deleteCard);

module.exports = router;
