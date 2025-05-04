import { config } from './index.js';
import { Pool } from 'pg';
import logger from '../infrastructure/logger.js';


const pool = new Pool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
});

pool.on('connect', () => {
    logger.info('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    logger.info('Unexpected error on idle client', err);
    process.exit(-1);
});

export default {
    query: (text, params) => pool.query(text, params),
    close: async () => await pool.end()
};