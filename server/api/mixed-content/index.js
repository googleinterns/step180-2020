/**
 * @fileoverview API Route
 * Route for mixed content queries, it uses BigQuery's
 * client and express's router.
 *
 * Queries are stored in /.queries.json, each has a name, description,
 * sqlQuery and suggested visualizations.
 *
 */

import {BigQuery} from '@google-cloud/bigquery';
import {Router as router} from 'express';
import * as queries from './queries.json';

const mixedApi = router();
const bigqueryClient = new BigQuery();

mixedApi.get('/top-websites-with-mixed-content', async (req, res) => {
  const query = await queries.TopWebsitesWithMixedContent;
  const rows = await queryData(query);

  res.json({
    description: query.description,
    result: rows,
    suggestedVisualizations: query.suggestedVisualizations,
  });
});

mixedApi.get(
    '/top-government-websites-with-mixed-content',
    async (req, res) => {
      const query = await queries.TopGovernmentWebsitesWithMixedContent;
      let rows = [];
      rows = await queryData(query);

      res.json({
        description: query.description,
        result: rows,
        suggestedVisualizations: query.suggestedVisualizations,
      });
    },
);

mixedApi.get('/top-countries-with-more-government-websites-with-mixed-content',
    async (req, res) => {
      const query = await
      queries.TopCountriesWithMoreGovernmentWebsitesWithMixedContent;
      const rows = await queryData(query);

      res.json({
        description: query.description,
        result: rows,
        suggestedVisualizations: query.suggestedVisualizations,
      });
    },
);

mixedApi.get('/mixed-content-percentage-histogram', async (req, res) =>{
  const query = await queries.MixedContentPercentageHistogram;
  let rows = [];
  rows = await queryData(query);

  res.json({
    description: query.description,
    result: rows,
    suggestedVisualizations: query.suggestedVisualizations,
  });
});

mixedApi.get('/mixed-content-by-type', async (req, res) =>{
  let query = queries.MixedContentByType;
  const type = req.query.type;
  if (type != 'all') {
    query = queries.MixedContentOneType;
  }
  let rows = [];
  rows = await queryType(query, type);
  if (type != 'all') {
    rows = toPieChart(rows);
  }
  res.json({
    type: type,
    result: rows,
  });
});

/**
 * Makes a BigQuery query given the query from ./queries.json
 * @param {object} data Query from /.queries.json
 * @return {object} Array of rows (result of the query).
 */
const queryData = async (data) => {
  if (typeof data.query === 'object') {
    data.query = data.query.join(' ');
  }
  const [rows] = await bigqueryClient.query({
    query: data.query,
    location: 'US',
  });

  return rows;
};

/**
 * Makes a BigQuery from ./queries.json, but takes a 'type'
 * parameter into account.
 * @param {object} data
 * @param {string} type
 */
const queryType = async (data, type) => {
  const index = data.typeIndex;
  let dataQuery=data.query;
  if (type!='all') {
    dataQuery[index] = '("%'+type+'/%")';
  }
  dataQuery = dataQuery.join(' ');
  const [rows] = await bigqueryClient.query({
    query: dataQuery,
    location: 'US',
  });
  return rows;
};

/**
 * Changes query result to graph a Pie chart
 * @param {object} result
 */
const toPieChart = async (result) => {
  const rows = [{'id': 'httpsPercentage', 'value': result[0].httpsPercentage},
    {'id': 'httpPercentage', 'value': result[0].httpPercentage}];
  return rows;
};

export default mixedApi;
