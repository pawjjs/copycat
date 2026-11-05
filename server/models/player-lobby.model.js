import { Lobby } from './lobby.model.js';
import { Player } from './player.model.js';

Lobby.hasMany(Player, {
    foreignKey: 'lobby_id',
    as: 'players'
});

Player.belongsTo(Lobby, {
    foreignKey: 'lobby_id',
    as: 'lobby'
});

export { Lobby, Player };