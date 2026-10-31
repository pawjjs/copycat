import {Lobby} from "../models/lobby.model.js";
import {Player} from "../models/player.model.js"
import {getPlayerById, players} from "../services/player.service.js";

let lobbies = [
    new Lobby(1, "waiting"),
    new Lobby(2, "waiting"),
];

lobbies[0].addPlayer(players[0]);

export function getAllLobbies() {
    return lobbies;
}

export function getLobbyById(id) {
    return lobbies.find((l) => l.id === id);
}

export function joinLobby(lobbyId, playerId) {
    const lobby = getLobbyById(lobbyId);
    if (!lobby) {
        return null;
    }

    const player = getPlayerById(playerId);
    if (!player) {
        return null;
    }

    lobby.addPlayer(player);
    return {lobby, joinedPlayer: player};
}


export function leaveLobby(lobbyId, playerId) {
    const lobby = getLobbyById(lobbyId);
    if (!lobby) {
        return null;
    }

    const player = getPlayerById(playerId);
    if (!player) {
        return null;
    }

    lobby.removePlayer(player);
    return {lobby, removedPlayer: player};
}

export function deleteLobby(lobbyId) {
    const index = lobbies.findIndex((l) => l.id === lobbyId);
    if (index === -1) {
        return null;
    }

    return lobbies.splice(index, 1)[0];
}