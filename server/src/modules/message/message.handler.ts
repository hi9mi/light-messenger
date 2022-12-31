import type { FastifyReply, FastifyRequest } from 'fastify';
import type { CreateMessageBody, EditMessageBody } from './message.schema';

export const createMessage = async (
  request: FastifyRequest<{ Body: CreateMessageBody }>,
  reply: FastifyReply,
) => {
  const currentUserId = request.user.id;
  const { text, dialogId } = request.body;

  const createdMessage = await request.prisma.message.create({
    data: {
      text,
      dialogId,
      creatorId: currentUserId,
    },
  });

  return reply.status(201).send(createdMessage);
};

export const getMessages = async (
  request: FastifyRequest<{ Params: { dialogId: number } }>,
  reply: FastifyReply,
) => {
  const dialogId = request.params.dialogId;

  const messages = await request.prisma.message.findMany({
    where: { dialogId },
  });

  return reply.status(200).send(messages);
};

export const getMessage = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) => {
  const id = request.params.id;

  const message = await request.prisma.message.findUnique({
    where: { id },
  });

  return reply.status(200).send(message);
};

export const editMessage = async (
  request: FastifyRequest<{ Params: { id: number }; Body: EditMessageBody }>,
  reply: FastifyReply,
) => {
  const id = request.params.id;
  const text = request.body.text;

  const editedMessage = await request.prisma.message.update({
    where: { id },
    data: { text },
  });

  return reply.status(200).send(editedMessage);
};

export const deleteMessage = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) => {
  const id = request.params.id;

  await request.prisma.message.delete({
    where: { id },
  });

  return reply
    .status(200)
    .send({ statusCode: 200, message: 'Message successfully deleted' });
};
