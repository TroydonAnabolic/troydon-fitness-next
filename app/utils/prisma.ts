import prisma from "@/prisma/prisma";
import { createUrlWithParams } from "./http";
import { UserSubscription } from "@/types";

async function getUserSubscripstionStatus(user: any) {
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

type QueryParams = {
  id: string;
};

export async function getUserSubscription(
  id: string | undefined
): Promise<UserSubscription> {
  const baseUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/getusersubscription`;

  const queryParams: QueryParams = {
    id: id as string,
  };
  const url = createUrlWithParams(baseUrl, queryParams);

  console.log(`Fetching  user subscription: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Error fetching  user subscription ${response.status} for ${url}`
    );
  }
  return response.json();
}

export default getUserSubscription;
