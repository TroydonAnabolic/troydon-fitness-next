import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { User, getServerSession } from "next-auth";

const stripe = new Stripe(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_SECRET_KEY!
    : process.env.STRIPE_SECRET_KEY_LOCAL!,
  {
    apiVersion: "2023-10-16",
  }
);

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

const webhookHandler = async (req: NextRequest) => {
  try {
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

    // Getting the data we want from the event
    const subscription = event.data.object as Stripe.Subscription;
    // const session = await getServerSession();
    // const user: User | undefined = session?.user;

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await prisma.user.update({
          // Find the customer in our database with the Stripe customer ID linked to this purchase
          where: {
            // id: user?.id,
            stripeCustomerId: subscription.customer as string,
          },
          // Update that customer so their status is now active
          data: {
            isActive: true,
            // TODO: later find a way to dynamically set isBasic or isPro etc for now only allow isBasic
            isBasic: true,
            activeSubscriptionId: subscription.id,
          },
        });
        break;
      case "customer.subscription.deleted":
        await prisma.user.update({
          // Find the customer in our database with the Stripe customer ID linked to this purchase
          where: {
            // id: user?.id,
            stripeCustomerId: subscription.customer as string,
          },
          // Update that customer so their status is now active
          data: {
            isActive: false,
            isBasic: false,
            activeSubscriptionId: null,
          },
        });
        break;
      default:
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        break;
    }

    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ received: true });
  } catch (err) {
    // If an error occurs
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (!(err instanceof Error)) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);

    return NextResponse.json(
      {
        error: {
          message: `Webhook Error: ${errorMessage}`,
        },
      },
      { status: 400 }
    );
  }
};

export { webhookHandler as POST };
