import type { FastifyInstance } from 'fastify';
import { localAuth } from './local-auth';

export const authRoutes = async (server: FastifyInstance) => {
  await server.register(localAuth, { prefix: '/local' });
};
