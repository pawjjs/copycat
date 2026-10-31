let lobbies = [
    {
        id: 1,
        status: 'waiting',
        players: []
    }
];

export function getAllLobbies() {
    return lobbies;
}

export function getLobbyById(id) {
    return lobbies.find((l) => l.id === id);
}

export function joinLobby(id, playerName) {
    const lobby = getLobbyById(id);
    if(!lobby){
        return null;
    }
    lobby.players.push(playerName); // zamiast dodawać nazwę na listę trzeba będzie dodawać obiekt
    return lobby;
}

export function deleteLobby(id){
    const index = lobbies.findIndex((l) => l.id === id);
    if(index === -1){
        return null;
    }
    
    return lobbies.splice(index, 1)[0];
}