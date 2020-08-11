/**
 * @fileoverview API Routers declaration
 *
 * Handle subrouter from ./route folder.
 * It is recommended to create a router for every model in database, so
 * it can be accessed via /:resource
 */
import mixedApi from './mixed-content';
import {Router as router} from 'express';

// TODO(ernestognw): Setup routes for every model in db
const api = router();

// Health check
api.get('/', (req, res) => {
  res.status(200).send('API working');
});

api.use('/mixed-content', mixedApi);

export default api;
