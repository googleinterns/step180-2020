/**
 * @fileoverview API Route
 * Route for TLS related queries
 *
 * Here are all routes for BigQuery TLS related queries
 */

import {Router as router} from 'express';
import {BigQuery} from '@google-cloud/bigquery';
import * as queries from './queries.json';

const tlsApi = router();
const bigqueryClient = new BigQuery();


tlsApi.get('/test',
    async (req, res) => {
      res.json({
        description: 'hello world',
      });
    },
);
// This route doesn't use queries.json
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
  FROM 
  `+table+`
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
    table:
      table,
    result: rows,
  });
});
// This route uses queries.json but also accepts
// 'table' param or 'year' and 'month' param
tlsApi.get('/test-json', async (req, res) => {
  const query = queries.TlsRequests;
  let table = req.query.table;
  const year = req.query.year;
  const month = req.query.month;
  if (year != null && month !=null) {
    table = 'httparchive.requests.'+year+'_'+month+'_01_desktop';
  }
  const rows = await queryData(query.query, table, query.tableIndex);

  res.json({
    description: query.description,
    result: rows,
    defaultSize: query.deafultSize,
    suggestedVisualizations: query.suggestedVisualizations,
    tableUsed: table,
  });
});

// TODO(sofiavega) find a way to make this function usable for
// all or most queries
const queryData = async (data, table, tableIndex) => {
  // Query is joined because it is partitioned in an array of instructions.
  if (table!=null) {
    data[tableIndex] = table;
  }
  data = data.join(' ');
  const [rows] = await bigqueryClient.query({
    query: data,
    location: 'US',
  });

  return rows;
};

export default tlsApi;
