const Tour = 'abc';//require('./../models/tourModel');
const User = require('./../models/userModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! If the booked tour doesn't show up here immediately, check again later";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  res.status(200).render('login');
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log In',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign Up',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'My Account',
  });
};

exports.getPaymentPage = (req, res) =>{
  res.status(200).render('payment', {
    title: 'Payment'
  })
}

exports.getBatchPage = (req, res) =>{
  res.status(200).render('batch', {
    title: 'Your Batch'
  })
}

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'My Account',
    user: updatedUser,
  });
});
