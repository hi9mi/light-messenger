import fp from 'fastify-plugin';
import fastifyEnv from '@fastify/env';

export const config = fp(
  async (server) => {
    const schema = {
      type: 'object',
      required: ['PORT', 'COOKIES_SECRET', 'HOST'],
      properties: {
        PORT: {
          type: 'string',
          default: 3000,
        },
        COOKIES_SECRET: {
          type: 'string',
          default: '',
        },
        HOST: {
          type: 'string',
          default: 'localhost',
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
      if (err) console.error(err);
    });
  },
  {
    name: 'config',
  }
);
