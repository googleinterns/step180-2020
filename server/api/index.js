/**
 * @fileoverview API Routers declaration
 *
 * This file is intended to handle the subrouter from ./route folder
 * It is recommended to create a router for every model in database, so
 * we can access them via /:resource
 */
import { Router as router } from 'express';
import { BigQuery } from '@google-cloud/bigquery';
import mixedApi from './mixed-content';

// TODO(ernestognw): Setup routes for every model in db
const api = router();
const bigqueryClient = new BigQuery();

// Health check
api.get('/', (req, res) => {
  res.status(200).send('API working');
});

// Health check (BigQuery)
api.get('/test', async (req, res) => {
  // The SQL query to run
  const sqlQuery = `SELECT COUNT(*) requests,
  COUNT(DISTINCT pageid) pages
FROM httparchive.summary_requests.2018_09_01_desktop
WHERE url NOT LIKE ("https%");`;

  const options = {
    query: sqlQuery,
    location: 'US',
  };

  const [rows] = await bigqueryClient.query(options);

  res.json({
    description: 'Stackoverflow dataset query for testing the routes',
    result: rows,
  });
});

api.use('/mixed-content', mixedApi);

export default api;
