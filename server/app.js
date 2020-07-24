/**
 * @fileoverview Express app declaration
 * Here is were the express application is initialized.
 *
 * If you'll add some new routes, it is recommended to do
 * it under ./api folder, which holds a the API router
 *
 * Also, if the server is goin to expose static files, it would
 * be okay to add the express middleware here to handle them
 */

import express from 'express';
import api from './api';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api', api);

export default app;
