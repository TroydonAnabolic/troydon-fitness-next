import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "@/app/utils/authOptions";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const stripe = new Stripe(
    process.env.NODE_ENV === "production"
      ? process.env.STRIPE_SECRET_KEY!
      : process.env.STRIPE_SECRET_KEY_LOCAL!,
    {
      apiVersion: "2023-10-16",
    }
  );

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      {
        error: {
          code: "no-access",
          message: "You are not signed in.",
        },
      },
      { status: 401 }
    );
  }

  const subscription = await stripe.subscriptions.cancel(
    body.activeSubscriptionId
  );

  if (!subscription.cancellation_details?.reason) {
    return NextResponse.json(
      {
        error: {
          code: "stripe-error",
          message: "Could not cancel subscription",
        },
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ subscription: subscription }, { status: 200 });
}
