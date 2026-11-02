import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import pg from 'pg';

import lobbyRoutes from "./routes/lobby.routes.js";


dotenv.config(); // https://www.npmjs.com/package/dotenv

const { Pool } = pg; // https://node-postgres.com/apis/pool

const dbHost = process.env.DB_HOST;
const dbUser = process.env.POSTGRES_USER;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DB;
const dbPort = process.env.DB_PORT;

const pool = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword,
    port: dbPort,
});


try {
    const res = await pool.query('SELECT NOW()'); // https://node-postgres.com/features/queries
    console.log('Połączono z PostgreSQL:', res.rows[0].now);
} catch (err) {
    console.error('Błąd połączenia z bazą danych:', err.message);
}

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

app.listen(PORT);
