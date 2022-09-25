import type { FastifyInstance } from 'fastify';

export const ping = async (server: FastifyInstance) => {
  server.get('/ping', async (_, reply) => {
    reply.status(200).send({
      message: `Pong ${reply.statusCode}`,
      text: `Light messenger server is online mode ${process.env.NODE_ENV}`,
    });
  });
};
