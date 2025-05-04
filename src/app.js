import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { config, limiter } from './config/index.js';
import db from './config/db.js';
import logger from './infrastructure/logger.js';


const app = express();
const port = config.PORT_NUMBER;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(limiter);

// TODO: Move code to somewhere else
app.get('/check-db', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.send('PostgreSQL database is connected!');
  } catch (error) {
    logger.error('Error checking database connection:', error);
    res.status(500).send('Failed to connect to PostgreSQL database.');
  }
});

const server = app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

const shutdown = async () => {
  await db.close();
  server.close((err) => {
    if (err) {
      logger.error('Error during server shutdown:', err);
    }
    logger.info('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);