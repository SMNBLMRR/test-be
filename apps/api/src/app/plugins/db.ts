import type { FastifyInstance } from "fastify";

import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function db(fastify: FastifyInstance) {
  await prisma.$connect();
  fastify.decorate("prisma", prisma);
  fastify.addHook("onClose", async (instance) => {
    //@ts-expect-error prisma from decorator
    await instance.prisma.$disconnect();
  });
}

export default fp(db, {
  name: "Fastify-prisma",
});
