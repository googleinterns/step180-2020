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
import queries from './queries.json';
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


  // If there is a certain number of datapoints required for visualization
  // it will select a subset with proportional skips.
  const datapoints = req.query.datapoints;
  if (datapoints) {
    let mobileRows = rows.filter((row) => row.client === 'mobile');
    let desktopRows = rows.filter((row) => row.client === 'desktop');
    mobileRows = select(mobileRows, datapoints);
    desktopRows = select(desktopRows, datapoints);
    rows = mobileRows.concat(desktopRows);
  }


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


  // If there is a certain number of datapoints required for visualization
  // it will select a subset with proportional skips.
  const datapoints = req.query.datapoints;
  if (datapoints) {
    let mobileRows = rows.filter((row) => row.client === 'mobile');
    let desktopRows = rows.filter((row) => row.client === 'desktop');
    mobileRows = select(mobileRows, datapoints);
    desktopRows = select(desktopRows, datapoints);
    rows = mobileRows.concat(desktopRows);
  }

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
const queryData = async ({sql}) => {
  if (Array.isArray(sql)) {
    sql = sql.join(' ');
  } else {
    throw new Error('SQL query must be an array');
  }

  const [rows] = await bigqueryClient.query({
    query: sql,
    location: 'US',
  });

  return rows;
};

/**
 * Selects a subset of elements of an array proportionally spaced
 *
 * If elements is 3 in this array, it selects: [1],2,3,[4],5,6,[7],8,9
 *
 * @param {Array} array Array to get subset from.
 * @param {number} elements Total number of elements to retrieve.
 * @return {Array} Subset of elements proportionally spaced.
 */
const select = (array, elements) => {
  const newArray = [];
  for (let i = 0; i < array.length && newArray.length < elements;
    i += Math.floor(array.length / elements)) {
    newArray.push(array[i]);
  }
  return newArray;
};

export default mixedApi;
