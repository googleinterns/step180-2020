import dotenv from 'dotenv';

dotenv.config();

const db = {
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  socketPath: process.env.DB_SOCKET_PATH
};

const env = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  production: process.env.NODE_ENV === 'production'
};

const port = process.env.PORT;

export { db, env, port };
