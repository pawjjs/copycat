import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // https://www.npmjs.com/package/dotenv

const dbHost = process.env.DB_HOST;
const dbUser = process.env.POSTGRES_USER;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DB;
const dbPort = process.env.DB_PORT;

export const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
        host: dbHost,
        port: dbPort,
        dialect: 'postgres',
    }
);

try {
    //await sequelize.authenticate();
    await sequelize.sync({force: true});
    console.log('Połączono z PostgreSQL przez Sequelize!');
} catch (err) {
    console.error('Błąd połączenia z bazą danych:', err.message);
}