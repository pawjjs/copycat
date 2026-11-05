import { Player, Lobby } from '../models/index.js';

export async function findAll() {
    return await Player.findAll();
}

export async function findById(id) {
    return await Player.findByPk(id, {
        include: [{
            model: Lobby,
            as: 'lobby'
        }]
    });
}

export async function create(name) {
    return await Player.create({ name });
}

export async function deleteById(id) {
    const player = await Player.findByPk(id);
    if (!player) {
        return null;
    }

    await player.destroy();
    return player;
}