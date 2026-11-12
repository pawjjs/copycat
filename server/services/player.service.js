import * as playerRepo from "../repositories/player.repository.js";

export function getAllPlayers() {
    return players;
}

export function getPlayerById(id) {
    return players.find((p) => p.id === id) || null;
}