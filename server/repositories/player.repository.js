import { Player, Lobby } from '../models/index.js';

export async function findAll() {
    return Player.findAll();
}

export async function findById(id) {
    return Player.findByPk(id, {
        include: [{
            model: Lobby,
            as: 'lobby'
        }]
    });
}

export async function create(name) {
    return Player.create({ name });
}

export async function deleteById(id) {
    const player = await Player.findByPk(id);
    if (!player) {
        return null;
    }

    await player.destroy();
    return player;
}