import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import prisma from "@/prisma/prisma";

const getUserSubscriptionHandler = async (req: NextRequest) => {
  console.log("Received request");
  const body = await req.json(); // body

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

  try {
    const userSubscription = await prisma.user.findUnique({
      where: { id: body.id },
      select: {
        isActive: true,
        isBasic: true,
        // Add other fields you want to select here
      },
    });

    if (!userSubscription) {
      return NextResponse.json(
        {
          error: {
            code: "stripe-error",
            message: "Could not find user subscription",
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { userSubscription: userSubscription },
      { status: 200 }
    );
  } catch (err: any) {
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

export { getUserSubscriptionHandler as GET };
