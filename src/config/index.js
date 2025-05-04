import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';


dotenv.config();

const config = {
  DB_DATABASE: process.env.DB_DATABASE,
  DB_HOST: process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USER: process.env.DB_USER,
  PORT_NUMBER: process.env.PORT_NUMBER  || 3000,
};


// TODO: Refine later
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

export { config, limiter };