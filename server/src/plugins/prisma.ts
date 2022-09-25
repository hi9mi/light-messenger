import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

export const prisma: FastifyPluginAsync = fp(async (server) => {
  const prisma = new PrismaClient();

  await prisma.$connect();

  server.decorate('prisma', prisma);

  server.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
  });
});
