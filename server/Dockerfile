FROM node:24.0.0-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY . .

RUN npm install

# TODO: add release build
ENTRYPOINT npm run dev
