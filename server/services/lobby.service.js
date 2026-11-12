import * as lobbyRepo from "../repositories/lobby.repository.js";
import * as playerRepo from "../repositories/player.repository.js";


export async function getAllLobbies() {
    return await lobbyRepo.findAll();
}

export async function getLobbyById(id) {
    return await lobbyRepo.findById(id);
}

export async function createLobby() {
    return await lobbyRepo.create();
}

export async function joinLobby(lobbyId, playerId) {
    const lobby = await lobbyRepo.findById(lobbyId);
    const player = await playerRepo.findById(playerId);

    if (!lobby || !player) {
        return null;
    }

    const updatedLobby = await lobbyRepo.assignPlayerToLobby(lobbyId, playerId);
    return {
        joinedPlayer: player,
        lobby: updatedLobby
    };
}

export async function leaveLobby(lobbyId, playerId) {
    const lobby = await lobbyRepo.findById(lobbyId);
    const player = await playerRepo.findById(playerId);

    if (!lobby || !player) {
        return null;
    }

    const updatedLobby = await lobbyRepo.assignPlayerToLobby(null, playerId);
    return {
        removedPlayer: player,
        lobby: updatedLobby
    };
}

export async function deleteLobby(lobbyId) {
    return await lobbyRepo.removeLobbyById(lobbyId);
}