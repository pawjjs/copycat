import {
    findAll as findAllLobbies,
    findById as findLobbyById,
    create as createNewLobby,
    assignPlayerToLobby,
    removeLobbyById
} from "../repositories/lobby.repository.js";
import {findById as findPlayerById} from "../repositories/player.repository.js";

export async function getAllLobbies() {
    return await findAllLobbies();
}

export async function getLobbyById(id) {
    return await findLobbyById(id);
}

export async function createLobby() {
    return await createNewLobby();
}

export async function joinLobby(lobbyId, playerId) {
    const lobby = await findLobbyById(lobbyId);
    const player = await findPlayerById(playerId);

    if (!lobby || !player) {
        return null;
    }

    const updatedLobby = await assignPlayerToLobby(lobbyId, playerId);
    return {
        joinedPlayer: player,
        lobby: updatedLobby
    };
}

export async function leaveLobby(lobbyId, playerId) {
    const lobby = await findLobbyById(lobbyId);
    const player = await findPlayerById(playerId);

    if (!lobby || !player) {
        return null;
    }

    const updatedLobby = await assignPlayerToLobby(null, playerId);
    return {
        removedPlayer: player,
        lobby: updatedLobby
    };
}

export async function deleteLobby(lobbyId) {
    return await removeLobbyById(lobbyId);
}