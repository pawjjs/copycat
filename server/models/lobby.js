import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
    class lobby extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            lobby.hasMany(models.player, {
                foreignKey: 'lobby_id', as: 'players'
            });

        }
    }

    lobby.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'lobby',
    });
    return lobby;
};