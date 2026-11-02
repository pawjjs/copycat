import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // https://www.npmjs.com/package/dotenv

const { Pool } = pg; // https://node-postgres.com/apis/pool

const dbHost = process.env.DB_HOST;
const dbUser = process.env.POSTGRES_USER;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DB;
const dbPort = process.env.DB_PORT;

const pool = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword,
    port: dbPort,
});


try {
    const res = await pool.query('SELECT NOW()'); // https://node-postgres.com/features/queries
    console.log('Połączono z PostgreSQL:', res.rows[0].now);
} catch (err) {
    console.error('Błąd połączenia z bazą danych:', err.message);
}