const express = require('express');
const Controller = require('./controller');
const protect = require('../../middlewares/protect');
const restrictTo = require('../../middlewares/restrictTo');

const router = express.Router();

router
  .route('/me')
  .get(protect, Controller.getMe)
  .patch(protect, Controller.updateMe);

router
  .route('/')
  .get(protect,restrictTo('admin'), Controller.getAllUsers);

router
  .route('/:id')
  .get(protect, Controller.getUser)
  .patch(protect,Controller.updateUser)
  .delete(protect, restrictTo('admin'), Controller.deleteUser);

module.exports = router;
