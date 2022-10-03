import type { FastifyInstance } from 'fastify';

import {
  logoutHandler,
  refreshTokenHandler,
  signInHandler,
  signUpHandler,
} from './local-auth.handler';
import {
  logoutSchema,
  refreshTokenSchema,
  signInSchema,
  signUpSchema,
} from './local-auth.schema';
import type { SignUpBody, SignInBody } from './local-auth.schema';

export const localAuth = async (server: FastifyInstance) => {
  server.post<{ Body: SignUpBody }>(
    '/sign-up',
    {
      schema: signUpSchema,
    },
    signUpHandler,
  );

  server.post<{ Body: SignInBody }>(
    '/sign-in',
    {
      schema: signInSchema,
    },
    signInHandler,
  );

  server.post(
    '/refresh',
    {
      schema: refreshTokenSchema,
      onRequest: [server.refresh],
    },
    refreshTokenHandler,
  );

  server.post(
    '/logout',
    {
      schema: logoutSchema,
      onRequest: [server.authenticate],
    },
    logoutHandler,
  );
};
