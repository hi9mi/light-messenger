FROM node:16.15.0-alpine as development

WORKDIR /home/messenger/server

COPY prisma ./prisma/
COPY package.json ./
COPY yarn.lock ./
COPY .env ./

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]