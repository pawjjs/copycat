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

const clients = {};

webSocketServer.on('connection', (client) =>{
    client.send('Witaj kliencie');
    client.on('message', (message) =>{
        const data = JSON.parse(message);

        if (data.type === "AUTH") {
            clients[data.id] = client;
        }

        if (data.type === "MSG") {
            const recipient = clients[data.to];

            if (recipient && recipient.readyState === 1) {
                recipient.send(data.content)
            }
        }
   });

    client.on("close", () => {
        for (const id in clients) {
            if (clients[id] === client) {
                delete clients[id];
            }
        }
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
