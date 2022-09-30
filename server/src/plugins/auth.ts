import jwt from '@fastify/jwt';
import fp from 'fastify-plugin';
import type { FastifyInstance, FastifyRequest } from 'fastify';

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
    verify: {
      extractToken(request) {
        const token = request.headers.authorization?.split(' ')[1];
        return token;
      },
    },
    messages: authMessages,
    namespace: 'auth',
  });

  server.decorate('authenticate', async (request: FastifyRequest) => {
    try {
      const verifiedPayload = await request.authJwtVerify<{
        id: number;
        iat: number;
        exp: number;
      }>();
      request.userId = verifiedPayload.id;
    } catch (err) {
      throw server.httpErrors.unauthorized('Authorization token is required');
    }
  });
});
