import { initialize, server } from './app';

const bootstrap = async () => {
  await initialize();

  server.listen(
    { port: Number(server.config.PORT), host: server.config.HOST },
    (err, address) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
      server.log.info(`Server listening at: ${address}`);
    }
  );
};

bootstrap();
