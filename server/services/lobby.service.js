import {Lobby} from "../models/lobby.model.js";
import {Player} from "../models/player.model.js"
import {getPlayerById, players} from "../services/player.service.js";

let lobbies = [
    new Lobby(1, "waiting"),
    new Lobby(2, "waiting"),
];


// for tests, later needs to be thought about for websockets. 
// might be problem with id collision, 
// trying to use crypto but don't know how will it work with websockets
export function generateUniqueId(numberOfBytes = 3){ 
    let buffer = new Uint8Array(numberOfBytes);
    crypto.getRandomValues(buffer);
    
    return Array.from(buffer).join('');
}

lobbies[0].addPlayer(players[0]);

export function getAllLobbies() {
    return lobbies;
}

export function getLobbyById(id) {
    return lobbies.find((l) => l.id === id);
}

export function createLobby(){
    const numberOfBytes = 3;
    const newLobby = {
        id: parseInt(generateUniqueId(numberOfBytes)),
        status: 'waiting',
        players: []
    };
    lobbies.push(newLobby);
    return newLobby;
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