import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LOCAL!
    );
  }
  return stripePromise;
};

export default getStripe;
