 const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '0.0.0.0', // Name of the PostgreSQL service in Docker Compose
    database: 'userdb',
    password: 'postgres',
    port: 3001,
});

module.exports = pool;
