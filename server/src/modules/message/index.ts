import type { FastifyInstance } from 'fastify';
import { messageController } from './message.controller';

export const messageRoutes = async (server: FastifyInstance) => {
  await server.register(messageController, { prefix: '/message' });
};
