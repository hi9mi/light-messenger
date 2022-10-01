import type { FastifyInstance } from 'fastify';
import * as argon from 'argon2';

import {
  signInBodySchema,
  signUpBodySchema,
  signInReplySchema,
  signUpReplySchema,
} from '../../../schemas';
import type { SignUpBody, SignInBody } from '../../../schemas';

// todo: move handlers to separate file

export const localAuth = async (server: FastifyInstance) => {
  server.post<{ Body: SignUpBody }>(
    '/sign-up',
    {
      schema: {
        body: signUpBodySchema,
        response: signUpReplySchema,
      },
    },
    async (request, reply) => {
      const { username, password, email, phoneNumber } = request.body;

      const existingUser = await server.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        reply.forbidden('User already exists');
      }

      const hashedPassword = await argon.hash(password);

      const newUser = await server.prisma.user.create({
        data: {
          username,
          email,
          phoneNumber,
          password: hashedPassword,
        },
      });

      const token = await reply.authJwtSign({ id: newUser.id });
      const refreshToken = await reply.refreshJwtSign({ id: newUser.id });

      const hashedRt = await argon.hash(refreshToken);

      await server.prisma.refreshToken.create({
        data: {
          userId: newUser.id,
          hashedRt,
        },
      });

      reply
        .setCookie('refreshToken', refreshToken, {
          domain: 'localhost',
          path: '/auth',
          httpOnly: true,
        })
        .status(201)
        .send({
          user: { ...newUser },
          token,
        });
    },
  );

  server.post<{ Body: SignInBody }>(
    '/sign-in',
    {
      schema: {
        body: signInBodySchema,
        response: signInReplySchema,
      },
    },
    async (request, reply) => {
      const { password, email } = request.body;

      const user = await server.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        reply.notFound('Incorrect credentials');
      }

      const isValidPassword = await argon.verify(user!.password, password);

      if (!isValidPassword) {
        reply.badRequest('Incorrect credentials');
      }

      const token = await reply.authJwtSign({ id: user!.id });
      const refreshToken = await reply.refreshJwtSign({ id: user!.id });

      const hashedRt = await argon.hash(refreshToken);

      await server.prisma.refreshToken.update({
        where: {
          userId: user!.id,
        },
        data: {
          hashedRt,
        },
      });

      reply
        .setCookie('refreshToken', refreshToken, {
          domain: 'localhost',
          path: '/auth',
          httpOnly: true,
        })
        .status(200)
        .send({
          user: { ...user },
          token,
        });
    },
  );

  server.post<{ Body: SignInBody }>(
    '/refresh',
    {
      // todo: add schemas
      onRequest: [server.refresh],
    },
    async (request, reply) => {
      const hashedRt = await server.prisma.refreshToken.findUnique({
        where: { userId: request.userId },
      });
      const refreshTokenFromCookie = request.cookies.refreshToken;

      if (!hashedRt || !refreshTokenFromCookie) {
        reply.forbidden('Refresh token is required');
      }

      const isValidRt = await argon.verify(
        hashedRt!.hashedRt!,
        refreshTokenFromCookie!,
      );

      if (!isValidRt) {
        reply.forbidden('Refresh token is invalid');
      }

      const token = await reply.authJwtSign({ id: request.userId });
      const refreshToken = await reply.refreshJwtSign({ id: request.userId });

      const newHashedRt = await argon.hash(refreshToken);

      await server.prisma.refreshToken.update({
        where: {
          userId: request.userId,
        },
        data: {
          hashedRt: newHashedRt,
        },
      });

      reply
        .setCookie('refreshToken', refreshToken, {
          domain: 'localhost',
          path: '/auth',
          httpOnly: true,
        })
        .status(200)
        .send({ token });
    },
  );

  server.post<{ Body: SignInBody }>(
    '/logout',
    {
      // todo: add schemas
      onRequest: [server.authenticate],
    },
    async (request, reply) => {
      const userId = request.userId;

      await server.prisma.refreshToken.updateMany({
        where: {
          userId,
          hashedRt: {
            not: null,
          },
        },
        data: {
          hashedRt: null,
        },
      });

      reply.status(200).send({ message: 'User logged out successfully' });
    },
  );
};
