import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
      stripeCustomerId: string;
      isActive: boolean;
      isBasic: boolean;
    };
  }
  interface User extends DefaultUser {
    stripeCustomerId: string;
    isActive: boolean;
    isBasic: boolean;
  }
}

type BlogPost = {
  id: string;
  title: string;
  date: string;
  author: string;
  description: string;
};
