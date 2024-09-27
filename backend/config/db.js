const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT || 5432, // Default to 5432 if not set
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Conectado a PostgreSQL');
    } catch (err) {
        console.error('Error al conectar a PostgreSQL', err.stack);
        process.exit(1); // Stop the application if it cannot connect
    }
};

const createTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS scores (
                id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                fighter_left VARCHAR(255),
                fighter_right VARCHAR(255),
                rounds INT,
                scores_left INT[],
                scores_right INT[],
                winner VARCHAR(255),
                date TIMESTAMPTZ DEFAULT NOW()
            );
        `;
        await pool.query(query);
        console.log('Table created successfully');
    } catch (err) {
        console.error('Error creating table', err.stack);
    }
};

// Call createTable once during the initial setup
createTable();

module.exports = { pool, connectDB };