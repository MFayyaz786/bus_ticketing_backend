const express = require('express');
const Controller = require('./controller');
const protect = require('../../middlewares/protect');
const restrictTo = require('../../middlewares/restrictTo');

const router = express.Router();

router
  .route('/')
  .post(protect, Controller.createTicket)
  .get(protect, Controller.getAllTicket);

router
  .route('/:id')
  .get(protect, Controller.getSingleTicket)
  .patch(protect,Controller.updateTicket)
  .delete(protect,  Controller.deleteTicket);

module.exports = router;
