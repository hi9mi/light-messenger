import type { FastifyInstance } from 'fastify';
import { dialogController } from './dialog.controller';

export const dialogRoutes = async (server: FastifyInstance) => {
  server.register(dialogController, { prefix: '/dialog' });
};
