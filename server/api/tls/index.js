/**
 * @fileoverview API Route
 * Route for TLS related queries
 *
 * Here are all routes for BigQuery TLS related queries
 */

import {BigQuery} from '@google-cloud/bigquery';
import queries from './queries.json';
import {Router as router} from 'express';

const tlsApi = router();
const bigQueryClient = new BigQuery();

// TODO (SofiaVega) delete this (this route is the same as the one below)
tlsApi.get('/tls-requests', async (req, res) => {
  const version = req.query.version;
  const year = req.query.year;
  const month = req.query.month;
  let table = 'httparchive.sample_data.requests_desktop_10k';
  if (year != null && month != null) {
    table = 'httparchive.requests.' + year + '_' + month + '_01_desktop';
  }
  let queryDescription = 'Number of requests per TLS version';
  let sqlQuery =
    `SELECT tls, COUNT(tls) as requests
  FROM
  (SELECT JSON_EXTRACT(payload, '$._securityDetails.protocol') as tls
  FROM 
  ` +
    table +
    `
  where url like ("https%"))
  GROUP BY tls`;
  if (version != null) {
    queryDescription = 'Number of requests that use TLS ' + version;
    sqlQuery =
      `SELECT COUNT(url) as requests
    FROM ` +
      table +
      `
    WHERE url like ("https%") AND 
    JSON_EXTRACT(payload, '$._securityDetails.protocol') 
    like "%TLS%` +
      version +
      `%"`;
  }

  const options = {
    query: sqlQuery,
    location: 'US',
  };

  const [rows] = await bigQueryClient.query(options);

  res.json({
    description: queryDescription,
    table: table,
    result: rows,
  });
});

tlsApi.get('/tls-version', async (req, res) => {
  const query = queries.TlsRequests;
  let table = req.query.table;
  const year = req.query.year;
  const month = req.query.month;
  if (year != 'sample') {
    table = 'httparchive.requests.' + year + '_' + month + '_01_desktop';
  }
  console.log('table');
  console.log(table);
  const rows = await queryData(query, table);

  res.json({
    description: query.description,
    result: rows,
    defaultSize: query.deafultSize,
    suggestedVisualizations: query.suggestedVisualizations,
    tableUsed: table,
  });
});

tlsApi.get('/key-exchange', async (req, res) => {
  const query = queries.KeyExchange;
  const table = req.query.table;
  const rows = await queryData(query, table);
  res.json({
    description: query.description,
    result: rows,
  });
});

const queryData = async (data, table) => {
  const index = data.tableIndex;
  let dataQuery = data.sql;
  if (table != null) {
    dataQuery[index] = table;
  }
  dataQuery = dataQuery.join(' ');
  const [rows] = await bigQueryClient.query({
    query: dataQuery,
    location: 'US',
  });

  return rows;
};

export default tlsApi;
