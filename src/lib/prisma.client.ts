import { PrismaClient, Prisma } from "@prisma/client";
import logger from "../lib/logger";
import { Config } from "../config";

const prisma = new PrismaClient({});

if (!Config.LIVE) {
  prisma.$use(async (params: any, next: (arg0: any) => any) => {
    const start = Date.now();
    const result = await next(params);
    const end = Date.now();

    logger.info(`Query took ${end - start}ms`);
    return result;
  });
}
export default prisma;
