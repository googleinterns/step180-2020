/**
 * @fileoverview API Route
 * Route for mixed content queries, it uses BigQuery's client and express's router.
 *
 * Queries are stored in /.queries.json, each has a name, description, sqlQuery and suggested visualizations.
 *
 */

import {Router as router} from 'express';
import {BigQuery} from '@google-cloud/bigquery';
// This is a collection of all queries and their metadata in json.
import * as queries from './queries.json';

const mixedApi = router();
const bigqueryClient = new BigQuery();

mixedApi.get('/top-websites-with-mixed-content', async (req, res) => {
  const query = queries.TopWebsitesWithMixedContent;
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
    const query = queries.TopGovernmentWebsitesWithMixedContent;
    const rows = await queryData(query);

    res.json({
      description: query.description,
      result: rows,
      suggestedVisualizations: query.suggestedVisualizations,
    });
  }
);

/**
 * Makes a BigQuery query given the query from ./queries.json
 * @param {object} data Query from /.queries.json
 * @return {object} Array of rows (result of the query).
 */
const queryData = async (data) => {
  // Query is joined because it is partitioned in an array of instructions.
  data.query = data.query.join(' ');

  const [rows] = await bigqueryClient.query({
    query: data.query,
    location: 'US',
  });

  return rows;
};

export default mixedApi;
