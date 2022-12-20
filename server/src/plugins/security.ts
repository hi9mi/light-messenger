import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export const security = fp(async (server) => {
  server.register(cors, {
    origin: server.config.CLIENT_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
});
