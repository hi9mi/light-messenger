import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export const security = fp(async (server) => {
  server.register(cors, {
    origin:
      process.env.NODE_ENV === 'production'
        ? server.config.CLIENT_BASE_URL
        : true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
});
