import fastify from 'fastify';
import { ping } from './ping';
import { config, prisma, security } from './plugins/';

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
};

const server = fastify({
  logger: envToLogger[process.env.NODE_ENV ?? ''] ?? true,
});

const initialize = async () => {
  await server.register(config);
  await server.register(security);
  // await server.register(prisma);
  await server.register(ping);
};

export { initialize, server };
