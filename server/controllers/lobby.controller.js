import * as lobbyService from "../services/lobby.service.js";

export async function getLobbies(req, res){
    const lobbies = await lobbyService.getAllLobbies();
    res.json(lobbies);
}

export async function getLobby(req, res){
    const lobbyId = parseInt(req.params.id);
    const lobby = await lobbyService.getLobbyById(lobbyId);
    
    if (!lobby) {
        return res.status(404).json({error: 'Nie znaleziono takiego lobby'});
    }
    res.json(lobby);
}

export async function createLobby(req, res){
    const lobby = await lobbyService.createLobby();
    
    res.json(lobby);
}

export async function joinLobby(req, res){
    const lobbyId = parseInt(req.params.id);
    const { playerId } = req.body ?? {};

    const result = await lobbyService.joinLobby(lobbyId, parseInt(playerId));
    if (!result) {
        return res.status(404).json({error: 'Nie znaleziono takiego lobby albo gracza'}); // do rozdzielenia za pomocą errorów
    }
    res.json({
        message: `Gracz ${result.joinedPlayer.name} dołączył do lobby ${lobbyId}`,
        joinedPlayer: result.joinedPlayer,
        lobby: result.lobby
    });
}

export async function leaveLobby(req, res){
    const lobbyId = parseInt((req.params.id));
    const { playerId } = req.body ?? {};

    const result = await lobbyService.leaveLobby(lobbyId, parseInt(playerId));
    if (!result) {
        return res.status(404).json({error: 'Nie znaleziono takiego lobby albo gracza'}); // do rozdzielenia za pomocą errorów
    }
    
    res.json({
        message: `Gracz ${result.removedPlayer.name} opuścił lobby ${lobbyId}`,
        removedPlayer: result.removedPlayerPlayer,
        lobby: result.lobby
    });
}

export async function deleteLobby(req, res){
    const lobbyId = parseInt(req.params.id);
    const deletedLobby = await lobbyService.deleteLobby(lobbyId);

    if (!deletedLobby) {
        return res.status(404).json({ error: "Nie znaleziono takiego lobby" });
    }

    res.json({
        message: `Lobby o ID ${lobbyId} zostało pomyślnie usunięte`,
        lobby: deletedLobby
    });
}