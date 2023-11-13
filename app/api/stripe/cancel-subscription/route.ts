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

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: session.user.stripeCustomerId,
    line_items: [
      {
        price: body.productId,
        quantity: 1,
      },
    ],
    success_url:
      (process.env.NODE_ENV === "production"
        ? process.env.NEXTAUTH_URL
        : process.env.NEXT_PUBLIC_NEXTAUTH_URL) + `/success`,
    cancel_url:
      (process.env.NODE_ENV === "production"
        ? process.env.NEXTAUTH_URL
        : process.env.NEXT_PUBLIC_NEXTAUTH_URL) + `/error`,
    subscription_data: {
      metadata: {
        payingUserId: session.user.id,
      },
    },
  });

  if (!checkoutSession.url) {
    return NextResponse.json(
      {
        error: {
          code: "stripe-error",
          message: "Could not create checkout session",
        },
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ session: checkoutSession }, { status: 200 });
}
