import type { FastifyInstance, FastifyBaseLogger } from 'fastify';
import type { Logger } from 'pino'
import type { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string;
      COOKIES_SECRET: string;
      HOST: string;
      CLIENT_BASE_URL: string;
    };
    prisma: PrismaClient;
  }
  interface FastifyBaseLogger extends Logger {}
}
