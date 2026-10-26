# node 24.22.1
FROM node:lts-alpine3.23
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY . .

RUN npm install

# TODO: add release build
ENTRYPOINT npm run dev
