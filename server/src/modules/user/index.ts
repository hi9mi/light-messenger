import type { FastifyInstance } from 'fastify';
import { userController } from './user.controller';

export const userRoutes = async (server: FastifyInstance) => {
  await server.register(userController, { prefix: 'user' });
};
