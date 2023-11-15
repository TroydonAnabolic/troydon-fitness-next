"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;

      const { data } = await axios.post("/api/stripe/create-payment-intent", {
        data: { amount: 10 },
      });

      const clientSecret = data;

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <CardElement />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
