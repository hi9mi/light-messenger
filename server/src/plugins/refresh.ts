import jwt from '@fastify/jwt';
import fp from 'fastify-plugin';
import type { FastifyInstance, FastifyRequest } from 'fastify';

const refreshMessages = {
  badRequestErrorMessage: 'Invalid cookie request',
  noAuthorizationInHeaderMessage: 'Cookie is missing!',
  authorizationTokenExpiredMessage: 'Refresh token expired',
  authorizationTokenInvalid: (err) => {
    return `Refresh token is invalid: ${err}`;
  },
};

export const refreshJwt = fp(async (server: FastifyInstance) => {
  server.register(jwt, {
    secret: server.config.REFRESH_TOKEN_SECRET,
    sign: {
      expiresIn: server.config.REFRESH_TOKEN_EXPIRES_IN,
    },
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    messages: refreshMessages,
    namespace: 'refresh',
  });

  server.decorate('refresh', async (request: FastifyRequest) => {
    try {
      const verifiedPayload = await request.refreshJwtVerify<{
        id: number;
        iat: number;
        exp: number;
      }>({ onlyCookie: true });
      request.userId = verifiedPayload.id;
    } catch (err) {
      server.httpErrors.unauthorized('Refresh token is required');
    }
  });
});
