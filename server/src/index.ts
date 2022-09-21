import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const server = fastify();
const prisma = new PrismaClient();

interface UserType {
  username: string;
  password: string;
}

interface ResponseType {
  message: string;
}

async function addUser({ username, password }) {
  await prisma.user.create({
    data: {
      username,
      password,
    },
  });
}

server.post<{ Body: UserType; Reply: ResponseType }>(
  '/add-user',
  function (request, reply) {
    const { username, password } = request.body;
    // console.log(request.body);
    addUser({ username, password })
      .then(() => {
        reply.code(200).send({ message: 'User created!' });
      })
      .catch((e) => {
        return reply
          .code(500)
          .send({ message: 'There was a problem adding the user.' });
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }
);

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
