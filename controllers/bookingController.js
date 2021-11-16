const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = 'abc';
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked Class
  const user = await User.findById(req.user.id);

  // 2) Create the checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/me`,
    cancel_url: `${req.protocol}://${req.get('host')}/pay`,
    customer_email: req.user.email,
    client_reference_id: req.user.id,
    line_items: [
      {
        name: `The Ananda Yoga Sessions`,
        description: `Book classes for this month and enjoy the gift of stillness and spirituality with Vedant's Yoga Classes`,
        images: [
          `${req.protocol}://${req.get('host')}/img/logo.png`,
        ],
        amount: 500 * 100,
        currency: 'inr',
        quantity: 1,
      },
    ],
  });

  // 3) Send it to the client
  res.status(200).json({
    status: 'success',
    session,
  });
});

const createBookingCheckout = async (session) => {
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.amount_total / 100;
  await Booking.create({ user, price });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object);

  res.status(200).json({ recieved: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
