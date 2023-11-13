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

const webhookSecret: string =
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_WEBHOOK_SECRET!
    : "whsec_a6a9cf1d271a0a5d7d18ac8a0ea42db183dfeb428cca03409c72add5e6ad359c";

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

// const endpointSecret =
//   "whsec_a6a9cf1d271a0a5d7d18ac8a0ea42db183dfeb428cca03409c72add5e6ad359c";
// // YOUR ENDPOINT SECRET copied from the Stripe CLI start-up earlier, should look like 'whsec_xyz123...'

// export const config = {
//   api: {
//     bodyParser: false, // don't parse body of incoming requests because we need it raw to verify signature
//   },
// };

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const requestBuffer = await buffer(req);
//     const sig = req.headers["stripe-signature"] as string;
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//       apiVersion: "2023-10-16",
//     });

//     let event;

//     try {
//       // Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
//       event = stripe.webhooks.constructEvent(
//         requestBuffer.toString(), // Stringify the request for the Stripe library
//         sig,
//         endpointSecret
//       );
//     } catch (err: any) {
//       console.log(`⚠️  Webhook signature verification failed.`, err.message);
//       return res.status(400).send(`Webhook signature verification failed.`);
//     }

//     // Handle the event
//     switch (event.type) {
//       // Handle successful subscription creation
//       case "customer.subscription.created": {
//         const subscription = event.data.object as Stripe.Subscription;
//         const session = await getServerSession();
//         const user: User | undefined = session?.user;
//         await prisma.user.update({
//           // Find the customer in our database with the Stripe customer ID linked to this purchase
//           where: {
//             id: user?.id,
//             stripeCustomerId: subscription.customer as string,
//           },
//           // Update that customer so their status is now active
//           data: {
//             isActive: true,
//           },
//         });
//         break;
//       }
//       // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     res.status(200).json({ received: true });
//   } catch (err) {
//     // Return a 500 error
//     console.log(err);
//     res.status(500).end();
//   }
// }
