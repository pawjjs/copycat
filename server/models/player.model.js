import {DataTypes} from "sequelize";
import {sequelize} from '../db/connection.js';

export const Player = sequelize.define(
    'Player',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        lobby_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        tableName: 'players',
    }
)