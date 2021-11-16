/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51JwG1JSIOqT33eIU0dIu3msBDqrpT9OZFCEmt6CdxmdhmFeKmOhAJ3HZT5CJZmVDF8uUp3BzWCHY9KAV1aJ05Nwy00g6UfLNk3'
);

export const bookClass = async () => {
  try {
    // 1) Get the checkout session from the endpoint/API
    const session = await axios(`/api/v1/bookings/checkout-session`);
    // console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
