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
  const year = req.query.year;
  const month = req.query.month;
  let table = 'httparchive.sample_data.requests_desktop_10k';
  // NOTE: This query could cost more than 2 TB if ran over recent tables
  // Sample data (default) or tables from 2016 are not as costly
  if (year != null && month !=null) {
    table = 'httparchive.requests.'+year+'_'+month+'_01_desktop';
  }
  let queryDescription = 'Number of requests per TLS version';
  let sqlQuery = `SELECT tls, COUNT(tls) as requests
  FROM
  (SELECT JSON_EXTRACT(payload, '$._securityDetails.protocol') as tls
  FROM `+table+`
  where url like ("https%"))
  GROUP BY tls`;
  if (version != null) {
    queryDescription = 'Number of requests that use TLS '+version;
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
      queryDescription,
    result: rows,
  });
});

export default tlsApi;
