FROM node:25-bookworm-slim

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY . .

RUN ls -la  
RUN npm install

# TODO: add release build
ENTRYPOINT npm run dev
