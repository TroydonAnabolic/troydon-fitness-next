import prisma from "@/prisma/prisma";

async function getUserSubscriptionStatus(user: any) {
  try {
    const userSubscription = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        isActive: true,
        isBasic: true,
        // Add other fields you want to select here
      },
    });

    return userSubscription;
  } catch (error: any) {
    throw new Error(
      `Error fetching user subscription status: ${error.message}`
    );
  }
}

export default getUserSubscriptionStatus;
