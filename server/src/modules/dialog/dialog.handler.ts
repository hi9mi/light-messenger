import { FastifyReply, FastifyRequest } from 'fastify';
import {
  CreateDialogBody,
  DeleteDialogParams,
  GetDialogByIdParams,
} from './dialog.schema';

export const createDialog = async (
  request: FastifyRequest<{ Body: CreateDialogBody }>,
  reply: FastifyReply,
) => {
  const currentUserId = request.user.id;
  const { partnerId, message } = request.body;
  const { id: dialogId } = await request.prisma.dialog.create({ data: {} });

  await Promise.all([
    request.prisma.participant.createMany({
      data: [
        {
          dialogId,
          userId: currentUserId,
        },
        {
          dialogId,
          userId: partnerId,
        },
      ],
    }),
    request.prisma.message.create({
      data: {
        dialogId,
        text: message,
        creatorId: currentUserId,
      },
    }),
  ]);

  const createdDialog = await request.prisma.dialog.findUnique({
    where: {
      id: dialogId,
    },
    include: {
      participants: { include: { user: { include: { profile: true } } } },
      messages: true,
    },
  });

  return reply.status(201).send(createdDialog);
};

export const getDialogById = async (
  request: FastifyRequest<{ Params: GetDialogByIdParams }>,
  reply: FastifyReply,
) => {
  const dialogId = request.params.id;

  const dialog = await request.prisma.dialog.findUnique({
    where: {
      id: dialogId,
    },
    include: {
      participants: { include: { user: { include: { profile: true } } } },
      messages: true,
    },
  });

  if (!dialog) {
    return reply.notFound('Dialog not found');
  }

  return reply.status(200).send(dialog);
};

export const getAllDialogs = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  //! need a pagination ?
  const dialogs = await request.prisma.dialog.findMany({
    include: {
      participants: { include: { user: { include: { profile: true } } } },
      messages: true,
    },
  });

  return reply.status(200).send(dialogs);
};

export const deleteDialog = async (
  request: FastifyRequest<{ Params: DeleteDialogParams }>,
  reply: FastifyReply,
) => {
  const dialogId = request.params.id;

  const isExistingDialog = Boolean(
    await request.prisma.dialog.findUnique({
      where: {
        id: dialogId,
      },
    }),
  );

  if (!isExistingDialog) {
    return reply.notFound('Dialog not existing');
  }

  await request.prisma.dialog.delete({
    where: {
      id: dialogId,
    },
  });

  return reply.status(200).send({
    message: 'Dialog successfully deleted',
    statusCode: 200,
  });
};
