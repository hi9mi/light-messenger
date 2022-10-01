import jwt from '@fastify/jwt';
import fp from 'fastify-plugin';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const authMessages = {
  badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
  noAuthorizationInHeaderMessage: 'Authorization header is missing!',
  authorizationTokenExpiredMessage: 'Authorization token expired',
  authorizationTokenInvalid: (err) => {
    return `Authorization token is invalid: ${err}`;
  },
};

export const authJwt = fp(async (server: FastifyInstance) => {
  await server.register(jwt, {
    secret: server.config.ACCESS_TOKEN_SECRET,
    sign: {
      expiresIn: server.config.ACCESS_TOKEN_EXPIRES_IN,
    },
    messages: authMessages,
    namespace: 'auth',
  });

  server.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.authJwtVerify();
      } catch (error) {
        reply.send(error);
      }
    },
  );
});
