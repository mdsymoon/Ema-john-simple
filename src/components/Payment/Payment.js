import React from "react";
import {  Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from './SimpleCardform';
import SpliteCardForm from './SpliteCardForm';

const stripePromise = loadStripe(
  "pk_test_51JQ4prEm3hqKl9sXPPOb7mmx8zdmO04r1xLjEYTNFcQ9zNULfs7rwybhWjGuVbg08jEDkRQP89pBniPJFTvMJynw009zQ6vwkD"
);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm></SimpleCardForm>
    </Elements>
  );
};

export default Payment;
