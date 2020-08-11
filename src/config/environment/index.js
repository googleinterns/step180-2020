/**
 * @fileoverview Config file to centralize environmental variables read
 *
 * Centralize access to environmental variables, so we can keep a track of
 * their use based on this file. Also, allows to standardize the way to access
 * and review them.
 *
 * NOTE: Environmental variables must be taken from /.env file, so, when
 * the project is in development environment, you must provide the .env file
 * using the .env.example at root folder.
 */

import dotenv from 'dotenv';

dotenv.config();

// Environment is automatically set by React
const env = {
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
};

const apiPort = process.env.REACT_APP_API_PORT;

export {env, apiPort};
