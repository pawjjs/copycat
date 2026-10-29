import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


import lobbyRoutes from "./routes/lobby.routes.js";

const app = express();
const PORT = 3000;



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


app.use(express.json());

let lobbies = [{
    id: 1,
    status: 'waiting',
    players: []
},];

app.get('/lobbies', (req, res) => {
    res.json(lobbies);
});

app.get('/lobby/:id', (req, res) => {
    const lobbyId = parseInt(req.params.id);
    const lobby = lobbies.find(l => l.id === lobbyId);
    if (!lobby) {
        return res.status(404).json({error: 'Nie znaleziono takiego lobby'});
    }
    res.json(lobby);
});

app.post('/lobby/:id/join', (req, res) => {
    const lobbyId = parseInt(req.params.id);
    const {playerName} = req.body ?? {};

    const lobby = lobbies.find(l => l.id === lobbyId);
    lobby.players.push(playerName);

    res.status(201).json({
        message: `Gracz ${playerName} dołączył do lobby ${lobbyId}`,
        lobby: lobby
    });
});

app.delete("/lobby/:id", (req, res) => {
    const lobbyId = parseInt(req.params.id);
    const lobbyIndex = lobbies.findIndex(l => l.id === lobbyId);

    if (lobbyIndex === -1) {
        return res.status(404).json({error: "Nie znaleziono takiego lobby"});
    }
    const deletedLobby = lobbies.splice(lobbyIndex, 1)[0];

    res.json({
        message: `Lobby o ID ${lobbyId} zostało pomyślnie usunięte`,
        lobby: deletedLobby
    });
});
app.listen(PORT);
