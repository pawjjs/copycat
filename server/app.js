import express from "express";

const app = express();
const PORT = 3000;

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

app.delete("/lobby/:id", (req, res) =>{
    const 
})

app.listen(PORT);