import {DataTypes} from "sequelize";
import {sequelize} from '../db/connection.js';

export const Lobby = sequelize.define(
    'Lobby', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'waiting',
        },
    },
    {
        tableName: 'lobbies',
    }
);