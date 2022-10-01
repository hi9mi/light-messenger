import jwt from '@fastify/jwt';
import fp from 'fastify-plugin';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const refreshMessages = {
  badRequestErrorMessage: 'Invalid cookie request',
  noAuthorizationInHeaderMessage: 'Cookie is missing!',
  noAuthorizationInCookieMessage: 'Cookie is missing!',
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
      cookieName: server.config.COOKIE_NAME,
      signed: false,
    },
    messages: refreshMessages,
    namespace: 'refresh',
  });

  server.decorate(
    'refresh',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.refreshJwtVerify({ onlyCookie: true });
      } catch (error) {
        reply.send(error);
      }
    },
  );
});
