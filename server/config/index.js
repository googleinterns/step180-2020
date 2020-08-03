/**
 * @fileoverview Config file to centralize environmental variables read
 *
 * Centralize access to environmental variables, so developers can keep a
 * track of their use based on this file. Also, allows to standardize the
 * way to access and review them.
 *
 * NOTE: Environmental variables must be taken from /.env file, so, when
 * the project is in development environment, you must provide the .env file
 * using the .env.example at root folder.
 *
 * In production environment, the environmental variables are not set
 * via dotenv. They're set using a parent process that reads the variables
 * from App Engine Datastore to keep them secret
 */

import dotenv from 'dotenv';

// Only use .env file in development environment
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

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
