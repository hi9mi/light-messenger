import swagger from '@fastify/swagger';
import fp from 'fastify-plugin';

export const swaggerPlugin = fp(async (server) => {
  server.register(swagger, {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Messenger server',
        description: 'Messenger server API',
        version: '1.0.0',
      },
      host: 'localhost:8080',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'auth', description: 'Auth related end-points' },
        { name: 'users', description: 'Users related end-points' },
      ],
    },
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    exposeRoute: true,
  });
});
