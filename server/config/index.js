import dotenv from 'dotenv';

dotenv.config();

const env = {
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
};

const db = {
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
};

// GAE Node Runtime automatically sets port
const port = env.development ? process.env.API_PORT : process.env.PORT;

export {db, env, port};
