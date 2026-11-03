CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);
/*
 https://www.postgresql.org/docs/current/datatype-numeric.html
 */
CREATE TABLE IF NOT EXISTS lobbies (
    id SERIAL PRIMARY KEY,
    status VARCHAR(20) NOT NULL DEFAULT 'waiting'
);

CREATE TABLE IF NOT EXISTS lobby_players (
    lobby_id SERIAL NOT NULL REFERENCES lobbies(id) ON DELETE CASCADE,
    player_id SERIAL NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    PRIMARY KEY (lobby_id, player_id)
);