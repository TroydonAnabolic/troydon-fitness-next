import { PrismaClient } from "@prisma/client";
import type { PrismaClient as PrismaClientType } from "@prisma/client";
let prisma: PrismaClientType;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(<any>global).prisma) {
    (<any>global).prisma = new PrismaClient();
  }

  prisma = (<any>global).prisma;
}

export { prisma };
