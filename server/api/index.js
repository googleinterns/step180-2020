/**
 * @fileoverview API Routers declaration
 *
 * This file is intended to handle the subrouter from ./route folder
 * It is recommended to create a router for every model in database, so
 * we can access them via /:resource
 */
import {Router as router} from 'express';

// TODO(ernestognw): Setup routes for every model in db
const api = router();

// Health check
api.get('/', (req, res) => {
  res.status(200).send('API working');
});

export default api;
