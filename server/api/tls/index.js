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

tlsApi.get('/tls-version', async (req, res) => {
  const query = queries.TlsRequests;
  let table = 'httparchive.sample_data.requests_desktop_10k';
  const year = req.query.year;
  const month = req.query.month;
  // Table will only be updated if a year is requested. Sample table is default
  if (year != 'sample') {
    table = 'httparchive.requests.' + year + '_' + month + '_01_desktop';
  }
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
  let table = 'httparchive.sample_data.requests_desktop_10k';
  const year = req.query.year;
  const month = req.query.month;
  if (year != 'sample') {
    table = 'httparchive.requests.' + year + '_' + month + '_01_desktop';
  }
  const rows = await queryData(query, table);
  res.json({
    description: query.description,
    result: rows,
  });
});

tlsApi.get('/CA', async (req, res) => {
  const query = queries.CA;
  let table = 'httparchive.sample_data.requests_desktop_10k';
  const year = req.query.year;
  const month = req.query.month;
  if (year != 'sample') {
    table = 'httparchive.requests.' + year + '_' + month + '_01_desktop';
  }
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
