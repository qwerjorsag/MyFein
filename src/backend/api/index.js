const express = require('express');
const bookingRoutes = require('./booking/booking');  // Import the booking route
const ordersRoutes = require('./orders/order');  // Import the booking route
const loginRoutes = require('./login/login');  // Import the booking route
const checkEmailRoutes = require('./checkEmail/checkEmail');
const registerRoutes = require('./register/register');  // Import the booking route
const paymentRoutes = require('./payments/payments');
const newsletterRoutes = require('./newsletter/newsletter');
const mergeRoutes = require('./sucessfullOrders/MergeOrderPayment');
const createReviewRoutes = require('./review/createReview');
const googleAuthRoutes = require("./auth/google/GoogleAuth");
const createPaymentIntentRoutes = require("./stripe/create-payment-intent/create-payment-intent");
const createPaymentIntentMCRoutes = require("./mastercard/initiate-payment");
const router = express.Router();

router.use("/stripe/create-payment-intent", createPaymentIntentRoutes)
router.use("/mastercard", createPaymentIntentMCRoutes)
router.use('/successfulOrders', mergeRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/review", createReviewRoutes);
router.use('/booking', bookingRoutes);
router.use('/auth/google', googleAuthRoutes);
router.use('/orders', ordersRoutes);
router.use('/login', loginRoutes);
router.use('/payments', paymentRoutes);
router.use('/register', registerRoutes);
router.use('/checkEmail', checkEmailRoutes);

module.exports = router;
