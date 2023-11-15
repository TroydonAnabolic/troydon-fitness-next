import prisma from "@/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import Stripe from "stripe";
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      session!.user!.id = user.id;
      session!.user!.stripeCustomerId = user.stripeCustomerId;
      session!.user!.isActive = user.isActive;
      return session;
    },
  },
  events: {
    createUser: async ({ user }: any) => {
      const stripe = new Stripe(
        process.env.NODE_ENV === "production"
          ? process.env.STRIPE_SECRET_KEY!
          : process.env.STRIPE_SECRET_KEY_LOCAL!,
        {
          apiVersion: "2023-10-16",
        }
      );

      await stripe.customers
        .create({
          email: user.email!,
          name: user.name!,
        })
        .then(async (customer) => {
          return prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customer.id,
            },
          });
        });
    },
  },
};
