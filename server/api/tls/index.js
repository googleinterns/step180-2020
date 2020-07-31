/**
 * @fileoverview API Route
 * Route for TLS related queries
 *
 * Here are all routes for BigQuery TLS related queries
 */

import {Router as router} from 'express';
import {BigQuery} from '@google-cloud/bigquery';

const tlsApi = router();
const bigqueryClient = new BigQuery();

tlsApi.get('/tls-requests', async (req, res) => {
  const version = req.query.version;
  const date = req.query.table;
  let table = 'httparchive.sample_data.requests_desktop_10k';
  if (date != null) {
    table = date;
  }
  let sqlQuery = `SELECT tls, COUNT(tls) as requests
  FROM
  (SELECT JSON_EXTRACT(payload, '$._securityDetails.protocol') as tls
  FROM `+table+`
  where url like ("https%"))
  GROUP BY tls`;
  if (version != null) {
    sqlQuery = `SELECT COUNT(url) as requests
    FROM `+table+`
    WHERE url like ("https%") AND 
    JSON_EXTRACT(payload, '$._securityDetails.protocol') 
    like "%TLS%`+version+`%"`;
  }

  const options = {
    query: sqlQuery,
    location: 'US',
  };

  const [rows] = await bigqueryClient.query(options);

  res.json({
    description:
      'Number of requests per TLS version',
    result: rows,
  });
});

export default tlsApi;
