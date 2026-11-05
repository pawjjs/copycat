import {Lobby, Player} from '../models/index.js';

export async function findAll() {
    return await Lobby.findAll({
        include: [{
            model: Player,
            as: 'players',
            attributes: ['id', 'name']
        }]
    });
}

export async function findById(id) {
    return await Lobby.findByPk(id, {
        include: [{
            model: Player,
            as: 'players',
            attributes: ['id', 'name']
        }]
    });
}

export async function create() {
    const newLobby = await Lobby.create({
        status: 'waiting'
    });
    return await findById(newLobby.id);
}

export async function addPlayerToLobby(lobbyId, playerId) {
    const lobby = await Lobby.findByPk(lobbyId);
    const player = await Player.findByPk(playerId);

    if (!lobby || !player) {
        return null;
    }

    player.lobby_id = lobbyId;
    await player.save();
    return await findById(lobbyId);
}

export async function removePlayerFromLobby(lobbyId, playerId) {
    const player = await Player.findByPk(playerId);
    if (!player || player.lobby_id !== lobbyId) {
        return null;
    }

    player.lobby_id = lobbyId;
    await player.save();
    return await findById(lobbyId);
}

export async function removeLobbyById(id) {
    const lobby = await findById(id);
    if (!lobby) {
        return null;
    }

    await Lobby.destroy({
        where: {id}
    });
    return lobby;
}