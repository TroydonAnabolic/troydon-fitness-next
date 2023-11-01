import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

type BlogPost = {
  id: string;
  title: string;
  date: string;
  author: string;
  description: string;
};
