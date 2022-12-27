import type { FastifyInstance } from 'fastify';
import {
  createDialog,
  deleteDialog,
  getAllDialogs,
  getDialogById,
} from './dialog.handler';
import {
  createDialogSchema,
  deleteDialogSchema,
  getAllDialogsSchema,
  getDialogByIdSchema,
} from './dialog.schema';
import type {
  CreateDialogBody,
  DeleteDialogParams,
  GetDialogByIdParams,
} from './dialog.schema';

export const dialogController = async (server: FastifyInstance) => {
  server.post<{
    Body: CreateDialogBody;
  }>(
    '/create',
    {
      schema: createDialogSchema,
      onRequest: [server.authenticate],
    },
    createDialog,
  );

  server.get<{
    Params: GetDialogByIdParams;
  }>(
    '/:id',
    {
      schema: getDialogByIdSchema,
      onRequest: [server.authenticate],
    },
    getDialogById,
  );

  server.get(
    '/all',
    {
      schema: getAllDialogsSchema,
      onRequest: [server.authenticate],
    },
    getAllDialogs,
  );

  server.delete<{ Params: DeleteDialogParams }>(
    '/delete/:id',
    {
      schema: deleteDialogSchema,
      onRequest: [server.authenticate],
    },
    deleteDialog,
  );
};
