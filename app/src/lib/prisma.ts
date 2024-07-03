// ts-ignore 7017 is used to ignore the error that the global object is not
// defined in the global scope. This is because the global object is only
// defined in the global scope in Node.js and not in the browser.

import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const getPrismaClient = (dbUrl: string) => {
  const globalForPrisma = global as unknown as {
    dbUrl: string;
    prisma: PrismaClient<{
      datasourceUrl: string;
      log: {
        level: "query";
        emit: "event";
      }[];
    }>;
  };

  const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      datasourceUrl: dbUrl,
      log: [{ level: "query", emit: "event" }],
    });

  if (process.env.NODE_ENV !== "production") {
    if ("dbUrl" in globalForPrisma && globalForPrisma.dbUrl !== dbUrl) {
      throw new Error(
        "PrismaClient has already been initialized. Please access `prisma` from the global context."
      );
    } else {
      globalForPrisma.dbUrl = dbUrl;
      globalForPrisma.prisma = prisma;
    }
  }

  return prisma;
};

export { getPrismaClient };

// export default prisma;
