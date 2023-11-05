import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import { prisma } from "@/prisma/shared-client";
import { User, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const endpointSecret =
  "whsec_a6a9cf1d271a0a5d7d18ac8a0ea42db183dfeb428cca03409c72add5e6ad359c";
// YOUR ENDPOINT SECRET copied from the Stripe CLI start-up earlier, should look like 'whsec_xyz123...'

export const config = {
  api: {
    bodyParser: false, // don't parse body of incoming requests because we need it raw to verify signature
  },
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const requestBuffer = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2023-10-16",
    });

    let event;

    try {
      // Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
      event = stripe.webhooks.constructEvent(
        requestBuffer.toString(), // Stringify the request for the Stripe library
        sig,
        endpointSecret
      );
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook signature verification failed.`);
    }

    // Handle the event
    switch (event.type) {
      // Handle successful subscription creation
      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        const session = await getServerSession();
        const user: User | undefined = session?.user;
        await prisma.user.update({
          // Find the customer in our database with the Stripe customer ID linked to this purchase
          where: {
            id: user?.id,
            stripeCustomerId: subscription.customer as string,
          },
          // Update that customer so their status is now active
          data: {
            isActive: true,
          },
        });
        break;
      }
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } catch (err) {
    // Return a 500 error
    console.log(err);
    res.status(500).end();
  }
}

// export async function POST(req: NextRequest, res: NextApiResponse) {
//   try {
//     const body = await req.json();
//     let sig: string = "";

//     req.headers.forEach((value, name) => {
//       if (name === "stripe-signature") {
//         sig = value as string;
//       }
//     });

//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//       apiVersion: "2023-10-16",
//     });

//     let event;

//     try {
//       // Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
//       event = stripe.webhooks.constructEvent(
//         body, // Stringify the request for the Stripe library
//         sig,
//         endpointSecret
//       );
//     } catch (err: any) {
//       console.log(`⚠️  Webhook signature verification failed.`, err.message);
//       //return res.status(400).send(`Webhook signature verification failed.`);
//       return new NextResponse(err, {
//         status: 400,
//       });
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
