import type { FastifyInstance } from 'fastify';

import {
  logoutHandler,
  refreshTokenHandler,
  signInHandler,
  signUpHandler,
} from './local-auth.handler';
import {
  signInBodySchema,
  signUpBodySchema,
  signInReplySchema,
  signUpReplySchema,
} from './local-auth.schema';
import type { SignUpBody, SignInBody } from './local-auth.schema';

export const localAuth = async (server: FastifyInstance) => {
  server.post<{ Body: SignUpBody }>(
    '/sign-up',
    {
      schema: {
        body: signUpBodySchema,
        response: signUpReplySchema,
      },
    },
    signUpHandler,
  );

  server.post<{ Body: SignInBody }>(
    '/sign-in',
    {
      schema: {
        body: signInBodySchema,
        response: signInReplySchema,
      },
    },
    signInHandler,
  );

  server.post<{ Body: SignInBody }>(
    '/refresh',
    {
      // todo: add schemas
      onRequest: [server.refresh],
    },
    refreshTokenHandler,
  );

  server.post<{ Body: SignInBody }>(
    '/logout',
    {
      // todo: add schemas
      onRequest: [server.authenticate],
    },
    logoutHandler,
  );
};
