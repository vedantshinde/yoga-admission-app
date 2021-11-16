const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
// const bookingController = require('./../controllers/bookingController');
const router = express.Router();

router.use(viewController.alerts);

router.get(
  '/',
  // bookingController.getBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);

router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewController.getSignupForm);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-batch', authController.protect, viewController.getBatchPage);
router.get('/pay', authController.protect, viewController.getPaymentPage);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

module.exports = router;
