'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class player extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            player.belongsTo(models.lobby, {
                foreignKey: 'lobby_id'
            });
        }
    }

    player.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        lobby_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'player',
    });

    return player;
};

