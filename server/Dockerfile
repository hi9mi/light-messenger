FROM node:16.15.0-alpine

WORKDIR /home/messenger/server

COPY prisma ./prisma/
COPY package.json ./
COPY yarn.lock ./

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]