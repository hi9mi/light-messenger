import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

export const prisma: FastifyPluginAsync = fp(async (server) => {
  const prisma = new PrismaClient({
    log: ['error', 'warn', 'info', 'query'],
  });

  let retries = 5;

  while (retries) {
    try {
      await prisma.$connect();
      server.log.info('Connected prisma to database');
      break;
    } catch (err) {
      server.log.error(err);
      retries -= 1;
      server.log.info(`retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  server
    .decorate('prisma', prisma)
    .decorateRequest('prisma', { getter: () => server.prisma })
    .addHook('onClose', async (server) => {
      server.log.info('Disconnecting prisma from database');
      await server.prisma.$disconnect();
    });
});
