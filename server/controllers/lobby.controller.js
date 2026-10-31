import * as lobbyService from "../services/lobby.service.js";

export function getLobbies(req, res){
    const lobbies = lobbyService.getAllLobbies();
    res.json(lobbies);
}

export function getLobby(req, res){
    const lobbyId = parseInt(req.params.id);
    const lobby = lobbyService.getLobbyById(lobbyId);
    if (!lobby) {
        return res.status(404).json({error: 'Nie znaleziono takiego lobby'});
    }
    res.json(lobby);
}

export function joinLobby(req, res){
    const lobbyId = parseInt(req.params.id);
    const {playerName} = req.body ?? {};

    const lobby = lobbyService.joinLobby(lobbyId, playerName);
    if (!lobby) {
        return res.status(404).json({error: 'Nie znaleziono takiego lobby'});
    }
    res.json({
        message: `Gracz ${playerName} dołączył do lobby ${lobbyId}`,
        lobby: lobby
    });
}

export function deleteLobby(req, res){
    const lobbyId = parseInt(req.params.id);
    const deletedLobby = lobbyService.deleteLobby(lobbyId);

    if (!deletedLobby) {
        return res.status(404).json({ error: "Nie znaleziono takiego lobby" });
    }

    res.json({
        message: `Lobby o ID ${lobbyId} zostało pomyślnie usunięte`,
        lobby: deletedLobby
    });
}