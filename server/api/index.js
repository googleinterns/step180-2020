import {Router as router} from 'express';

// TODO(ernestognw): Setup routes for every model in db
const api = router();

// Health check
api.get('/', (req, res) => {
  res.status(200).send('API working');
});

export default api;
