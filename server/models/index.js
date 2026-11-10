import { Sequelize, DataTypes } from 'sequelize';
import process from 'process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const initLobbyModel = require('./lobby.js');
const initPlayerModel = require('./player.js');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Lobby = initLobbyModel(sequelize, DataTypes);
db.Player = initPlayerModel(sequelize, DataTypes);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

