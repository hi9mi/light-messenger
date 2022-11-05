import closeWithGrace from 'close-with-grace';
import { initializeServer } from './server';

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

const bootstrap = async () => {
  const server = await initializeServer({
    logger: envToLogger[process.env.NODE_ENV ?? ''] ?? true,
  });

  server.listen(
    { port: Number(server.config.PORT), host: server.config.HOST },
    (err, address) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
      server.log.info(`Server listening at: ${address}`);
    },
  );

  closeWithGrace({ delay: 10000 }, async () => {
    server.log.info('Server closing');
    await server.close();
    server.log.info('Server closed');
  });
};

bootstrap();
