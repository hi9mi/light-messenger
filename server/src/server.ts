import fastify from 'fastify';
import cookie from '@fastify/cookie';
import fs from 'fs/promises';
import path from 'path';
import type { FastifyBaseLogger, FastifyServerOptions } from 'fastify';
import type { FastifyCookieOptions } from '@fastify/cookie';
import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import type { Server } from 'http';

import { authRoutes } from './modules/auth';
import {
  authJwt,
  refreshJwt,
  config,
  prisma,
  security,
  sensiblePlugin,
  swaggerPlugin,
} from './plugins';
import { ping } from './ping';
import { userRoutes } from './modules/user';
import { dialogRoutes } from './modules/dialog';

const initializeServer = async (
  options: FastifyServerOptions<Server, FastifyBaseLogger> = {},
) => {
  const server = fastify(options).withTypeProvider<JsonSchemaToTsProvider>();

  await server.register(config);
  await server.register(security);
  await server.register(cookie, {} as FastifyCookieOptions);
  await server.register(authJwt);
  await server.register(refreshJwt);
  await server.register(sensiblePlugin);
  await server.register(prisma);
  await server.register(swaggerPlugin);
  await server.register(ping);
  await server.register(authRoutes, { prefix: '/auth' });
  await server.register(userRoutes);
  await server.register(dialogRoutes);

  const swaggerJson = JSON.stringify(server.swagger(), undefined, 2);
  await fs.writeFile(
    path.resolve(__dirname, '..', '..', 'client', 'swagger-api.json'),
    swaggerJson,
  );

  return server;
};

export { initializeServer };
