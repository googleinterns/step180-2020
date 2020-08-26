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
import {BigQuery} from '@google-cloud/bigquery';
import queries from './queries.json';
import {Router as router} from 'express';

const mixedApi = router();
const bigQueryClient = new BigQuery();

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

mixedApi.get(
  '/top-countries-with-more-government-websites-with-mixed-content',
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

mixedApi.get(
  '/top-countries-with-more-government-' +
    'websites-with-mixed-content-adjusted',
  async (req, res) => {
    const query =
      queries.TopCountriesWithMoreGovernmentWebsitesWithMixedContentAdjusted;
    let rows = [];
    rows = await queryData(query);

    res.json({
      description: query.description,
      result: rows,
      suggestedVisualizations: query.suggestedVisualizations,
    });
  },
);

mixedApi.get('/mixed-content-percentage-histogram', async (req, res) => {
  const query = queries.MixedContentPercentageHistogram;
  let rows = [];
  rows = await queryData(query);

  res.json({
    description: query.description,
    result: rows,
    suggestedVisualizations: query.suggestedVisualizations,
  });
});

mixedApi.get('/mixed-content-by-type', async (req, res) => {
  let query = queries.MixedContentByType;
  const type = req.query.type;
  if (type != 'all') {
    query = queries.MixedContentOneType;
  }
  let rows = [];
  rows = await queryType(query, type);
  if (type != 'all') {
    rows = await toPieChart(rows);
  }
  res.json({
    description: query.description,
    type: type,
    result: rows,
  });
});

mixedApi.get('/https-percentage-pages', async (req, res) => {
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

mixedApi.get('/https-percentage-requests', async (req, res) => {
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

mixedApi.get('/hsts-percentage-requests', async (req, res) => {
  const query = queries.HSTSPercentageRequests;
  let rows = [];
  rows = await queryData(query);

  res.json({
    description: query.description,
    result: rows,
    suggestedVisualizations: query.suggestedVisualizations,
  });
});

mixedApi.get('/https-percentage-pages', async (req, res) => {
  const query = queries.HTTPSPercentagePages;
  let rows = [];
  rows = await queryData(query);

  res.json({
    description: query.description,
    result: rows,
    suggestedVisualizations: query.suggestedVisualizations,
  });
});

mixedApi.get('/https-percentage-requests', async (req, res) => {
  const query = queries.HTTPSPercentageRequests;
  let rows = [];
  rows = await queryData(query);

  res.json({
    description: query.description,
    result: rows,
    suggestedVisualizations: query.suggestedVisualizations,
  });
});

mixedApi.get('/hsts-percentage-requests', async (req, res) => {
  const query = queries.HSTSPercentageRequests;
  let rows = [];
  rows = await queryType(query, type);
  if (type != 'all') {
    rows = await toPieChart(rows);
  }
  res.json({
    description: query.description,
    type: type,
    result: rows,
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
  const [rows] = await bigQueryClient.query({
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
  for (
    let i = 0;
    i < array.length && newArray.length < elements;
    i += Math.max(Math.floor(array.length / elements), 1)
  ) {
    newArray.push(array[i]);
  }
  return newArray;
};

/*
 * Makes a BigQuery from ./queries.json, but takes a 'type'
 * parameter into account.
 * @param {object} data
 * @param {string} type
 */
const queryType = async (data, type) => {
  const index = data.typeIndex;
  let dataQuery = data.sql;
  if (type != 'all') {
    dataQuery[index] = '("%' + type + '/%")';
  }
  dataQuery = dataQuery.join(' ');
  const [rows] = await bigQueryClient.query({
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
  const rows = [
    {id: 'HTTPS', value: result[0].httpsPercentage},
    {id: 'HTTP', value: result[0].httpPercentage},
  ];
  return rows;
};

export default mixedApi;
