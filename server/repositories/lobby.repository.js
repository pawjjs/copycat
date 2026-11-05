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

export async function assignPlayerToLobby(lobbyId, playerId) {
    const player = await Player.findByPk(playerId);

    player.lobby_id = lobbyId;
    await player.save();
    return await findById(lobbyId);
}

export async function removeLobbyById(lobbyId) {
    const lobby = await findById(lobbyId);
    if (!lobby) {
        return null;
    }

    await Lobby.destroy({
        where: {id: lobbyId}
    });
    return lobby;
}