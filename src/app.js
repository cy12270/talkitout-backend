import express from 'express';
import db from './config/db.js';
import config from './config/index.js';


const app = express();
const port = config.PORT_NUMBER;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/check-db', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.send('PostgreSQL database is connected!');
    } catch (error) {
        console.error('Error checking database connection:', error);
        res.status(500).send('Failed to connect to PostgreSQL database.');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});