import type { FastifyInstance } from 'fastify';

export const userRoutes = async (server: FastifyInstance) => {
  server.get(
    '/me',
    { onRequest: [server.authenticate] },
    async (request, reply) => {
      const user = await server.prisma.user.findUnique({
        where: {
          id: request.user.id,
        },
      });

      if (!user) {
        return reply.notFound('User not found');
      }

      return reply.status(200).send(user);
    },
  );

  server.get('/', { onRequest: [server.authenticate] }, async (_, reply) => {
    const users = await server.prisma.user.findMany();

    if (!users) {
      return reply.notFound('Users not found');
    }

    return reply.status(200).send(users);
  });
};
