import type { FastifyInstance } from 'fastify';

export const gateway = async (server: FastifyInstance) => {
  server.ready((error) => {
    if (error) throw error;

    server.io.on('connection', (socket) => {
      socket.on('CLIENT:DIALOGS', (userId: string) => {
        socket.join(userId);
      });
    });
  });
};
