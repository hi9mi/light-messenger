import fp from 'fastify-plugin';
import fastifyEnv from '@fastify/env';

export const config = fp(
  async (server) => {
    const schema = {
      type: 'object',
      required: [
        'PORT',
        'HOST',
        'REFRESH_TOKEN_SECRET',
        'ACCESS_TOKEN_SECRET',
        'REFRESH_TOKEN_EXPIRES_IN',
        'ACCESS_TOKEN_EXPIRES_IN',
        'COOKIE_NAME',
      ],
      properties: {
        PORT: {
          type: 'string',
          default: 3000,
        },
        ACCESS_TOKEN_SECRET: {
          type: 'string',
          default: 'access_token',
        },
        REFRESH_TOKEN_SECRET: {
          type: 'string',
          default: 'refresh_token',
        },
        REFRESH_TOKEN_EXPIRES_IN: {
          type: 'string',
          default: '1d',
        },
        ACCESS_TOKEN_EXPIRES_IN: {
          type: 'string',
          default: '5m',
        },
        HOST: {
          type: 'string',
          default: 'localhost',
        },
        COOKIE_NAME: {
          type: 'string',
          default: 'cookie_name',
        },
      },
    };

    const options = {
      dotenv: true,
      confKey: 'config',
      schema: schema,
      data: process.env,
    };

    server.register(fastifyEnv, options).ready((err) => {
      if (err) server.log.error(err);
    });

    server.decorateRequest('config', { getter: () => server.config });
  },
  {
    name: 'config',
  },
);
