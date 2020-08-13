/**
 * @fileoverview API Route
 * Route for mixed content queries, it uses BigQuery's
 * client and express's router.
 *
 * Queries are stored in /.queries.json, each has a name, description,
 * sqlQuery and suggested visualizations.
 *
 */

// This is a collection of all queries and their metadata in json.
import * as queries from './queries.json';
import {BigQuery} from '@google-cloud/bigquery';
import {Router as router} from 'express';

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
      const query =
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
  const query = queries.MixedContentPercentageHistogram;
  let rows = [];
  rows = await queryData(query);

  res.json({
    description: query.description,
    result: rows,
    suggestedVisualizations: query.suggestedVisualizations,
  });
});


mixedApi.get('/https-percentage-pages', async (req, res) =>{
  const query = queries.HTTPSPercentagePages;
  let rows = [];
  rows = await queryData(query);

  res.json({
    description: query.description,
    result: rows,
    suggestedVisualizations: query.suggestedVisualizations,
  });
});

mixedApi.get('/https-percentage-requests', async (req, res) =>{
  const query = queries.HTTPSPercentageRequests;
  let rows = [];
  rows = await queryData(query);

  res.json({
    description: query.description,
    result: rows,
    suggestedVisualizations: query.suggestedVisualizations,
  });
});

mixedApi.get('/hsts-percentage-requests', async (req, res) =>{
  const query = queries.HSTSPercentageRequests;
  let rows = [];
  rows = await queryData(query);

  res.json({
    description: query.description,
    result: rows,
    suggestedVisualizations: query.suggestedVisualizations,
  });
});

/**
 * Makes a BigQuery query given the query from ./queries.json
 * @param {{query: array}} data Query from /.queries.json
 * @return {object} Array of rows (result of the query).
 */
const queryData = async ({query}) => {
  if (Array.isArray(query)) {
    query = query.join(' ');
  } else {
    throw new Error('Query must be an array');
  }
  const [rows] = await bigqueryClient.query({
    query: query,
    location: 'US',
  });

  return rows;
};

export default mixedApi;
