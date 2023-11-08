const express = require('express');
const Controller = require('./controller');
const protect = require('../../middlewares/protect');
    
const router = express.Router();

router.post('/signUp', Controller.signup);
router.post('/logIn', Controller.login);
// router.post('/sociallogin', Controller.socialLogin);

router.route('/update-password').patch(protect, Controller.updatePassword);

router.route('/forgotPassword').post(Controller.forgotPassword);
router.route('/confirmMail/:activationLink').get(Controller.confirmMail);
router.route('/resetPassword/:resetToken').patch(Controller.resetPassword);

module.exports = router;
