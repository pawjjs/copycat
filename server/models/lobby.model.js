export class Lobby {
    constructor(id, status) {
        this.id = id;
        this.status = status;
        this.players = [];
    }

    addPlayer(player) {
        const doesExists = this.players.some((p) => p.id === player.id);
        if (!doesExists) {
            this.players.push(player);
        }
    }

    removePlayer(player) {
        if (!player || player.id === undefined) {
            return;
        }
        this.players = this.players.filter((p) => p.id !== player.id);
    }
}