/**
 * @fileoverview Express app declaration
 *
 * Initializes server application
 *
 * If you'll add some new routes, it is recommended to do
 * it under ./api folder, which holds a the API router
 *
 * Also, if the server is going to expose static files, it would
 * be okay to add the express middleware here to handle them
 */

import express from 'express';
import api from './api';
import allowEveryOrigin from './middlewares/allow-every-origin';
import {env} from './config';

const app = express();

// Middlewares
app.use(express.json());

if (env.development) {
  app.use(allowEveryOrigin);
}

// Routes
app.use('/api', api);

export default app;
