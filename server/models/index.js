import Sequelize from 'sequelize';
import configData from '../config/config.js';
import initLobbyModel from './lobby.js';
import initPlayerModel from './player.js';

const env = process.env.NODE_ENV || 'development';
const config = configData[env];

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}


const db = {
    lobby: initLobbyModel(sequelize, Sequelize.DataTypes),
    player: initPlayerModel(sequelize, Sequelize.DataTypes),
};
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize, Sequelize };
export default db;
