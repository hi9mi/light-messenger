import type { FastifyInstance } from 'fastify';

export const userRoutes = async (server: FastifyInstance) => {
  server.get(
    '/',
    { onRequest: [server.authenticate] },
    async (request, reply) => {
      const user = await server.prisma.user.findUnique({
        where: {
          id: request.user.id,
        },
      });

      if (!user) {
        reply.notFound('User not found');
      }

      reply.status(200).send(user);
    },
  );
};
