import express from "express";
import {WebSocketServer} from "ws";
import http from "http";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import lobbyRoutes from "./routes/lobby.routes.js";
import "./db/connection.js";

const PORT = 3000;
const app = express();

const server = http.createServer(app);
const webSocketServer = new WebSocketServer({
    server: server
});

webSocketServer.on('connection', (client) =>{
   client.send('Witaj kliencie');
   client.on('message', (message) =>{
      console.log(message);
      client.send(message);
   });
});


app.use(express.json());

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.2.1",
        info: {
            title: "API",
            version: "1.0.0",
            description: "API"
        },
        servers: [
            {url: "http://localhost:3000"}
        ]
    },
    apis: ["./routes/*.js"]
});

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/lobbies", lobbyRoutes);

server.listen(PORT);
