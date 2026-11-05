import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import lobbyRoutes from "./routes/lobby.routes.js";
import { sequelize } from "./db/connection.js";
import "./models/index.js";

const app = express();
const PORT = 3000;

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
            { url: "http://localhost:3000" }
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

try {
    await sequelize.sync();
    console.log("Tabele PostgreSQL zsynchronizowane pomyślnie.");
} catch (error) {
    console.error("Błąd synchronizacji bazy danych:", error);
}

app.listen(PORT);
