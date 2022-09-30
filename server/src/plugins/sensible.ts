import fp from 'fastify-plugin';
import sensible, { SensibleOptions } from '@fastify/sensible';

export const sensiblePlugin = fp<SensibleOptions>(async (server) => {
  server.register(sensible);
});
