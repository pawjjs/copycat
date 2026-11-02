import {Player} from "../models/player.model.js"

export let players = [
    new Player(0, "Kucu"),
    new Player(1, "Ania")
];

export function getAllPlayers() {
    return players;
}

export function getPlayerById(id) {
    return players.find((p) => p.id === id) || null;
}