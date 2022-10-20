import * as argon from 'argon2';
import type { FastifyReply, FastifyRequest } from 'fastify';

import type { SignInBody, SignUpBody } from './local-auth.schema';

export const signUpHandler = async (
  request: FastifyRequest<{ Body: SignUpBody }>,
  reply: FastifyReply,
) => {
  const { username, password, email, phoneNumber } = request.body;

  const existingUser = await request.prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return reply.forbidden('User already exists');
  }

  const hashedPassword = await argon.hash(password);

  const newUser = await request.prisma.user.create({
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

  await request.prisma.refreshToken.create({
    data: {
      userId: newUser.id,
      hashedRt,
    },
  });

  return reply
    .setCookie(request.config.COOKIE_NAME, refreshToken, {
      domain: 'localhost',
      path: '/auth',
      httpOnly: true,
    })
    .status(201)
    .send({
      user: newUser,
      token,
    });
};

export const signInHandler = async (
  request: FastifyRequest<{ Body: SignInBody }>,
  reply: FastifyReply,
) => {
  const { password, email } = request.body;

  const user = await request.prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return reply.badRequest('Incorrect credentials');
  }

  const isValidPassword = await argon.verify(user!.password, password);

  if (!isValidPassword) {
    return reply.badRequest('Incorrect credentials');
  }

  const token = await reply.authJwtSign({ id: user!.id });
  const refreshToken = await reply.refreshJwtSign({ id: user!.id });

  const hashedRt = await argon.hash(refreshToken);

  await request.prisma.refreshToken.update({
    where: {
      userId: user!.id,
    },
    data: {
      hashedRt,
    },
  });

  return reply
    .setCookie(request.config.COOKIE_NAME, refreshToken, {
      domain: 'localhost',
      path: '/auth',
      httpOnly: true,
    })
    .status(200)
    .send({
      user,
      token,
    });
};

export const refreshTokenHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.user.id;
  const hashedRt = await request.prisma.refreshToken.findUnique({
    where: { userId },
  });
  const refreshTokenFromCookie = request.cookies.refreshToken;
  console.log(hashedRt, 455664646);
  if (!hashedRt?.hashedRt || !refreshTokenFromCookie) {
    return reply.forbidden('Refresh token is required');
  }

  const isValidRt = await argon.verify(
    hashedRt.hashedRt,
    refreshTokenFromCookie,
  );

  if (!isValidRt) {
    return reply.forbidden('Refresh token is invalid');
  }

  const token = await reply.authJwtSign({ id: userId });
  const refreshToken = await reply.refreshJwtSign({ id: userId });

  const newHashedRt = await argon.hash(refreshToken);

  await request.prisma.refreshToken.update({
    where: {
      userId,
    },
    data: {
      hashedRt: newHashedRt,
    },
  });

  return reply
    .setCookie(request.config.COOKIE_NAME, refreshToken, {
      domain: 'localhost',
      path: '/auth',
      httpOnly: true,
    })
    .status(200)
    .send({ token });
};

export const logoutHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.user.id;

  await request.prisma.refreshToken.updateMany({
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
};
