/**
 * @fileoverview API Route
 * Route for mixed content queries
 *
 * Here are all routes for BigQuery mixed-content related queries, each has
 * a description and suggestion for a visualization.
 */

import { Router as router } from 'express';
import { BigQuery } from '@google-cloud/bigquery';

const mixedApi = router();
const bigqueryClient = new BigQuery();

mixedApi.get('/top-websites-with-mixed-content', async (req, res) => {
  const sqlQuery = `SELECT
    pages.url,
    COUNT(CASE WHEN reqs.url LIKE "http:%" THEN 1 END) mixed_reqs_total,
    COUNT(CASE WHEN reqs.url LIKE "http:%" THEN 1 END) / COUNT(0) mixed_percentage
  FROM
    httparchive.sample_data.summary_requests_desktop_10k reqs
  JOIN
    httparchive.sample_data.summary_pages_desktop_10k pages
  ON
    reqs.pageid=pages.pageid
  GROUP BY
    pages.url
   ORDER BY mixed_reqs_total DESC
   LIMIT 10`;

  const options = {
    query: sqlQuery,
    location: 'US',
  };

  const [rows] = await bigqueryClient.query(options);

  res.json({
    description:
      'Top websites with most mixed content and the percentage of mixed content in it.',
    result: rows,
  });
});

export default mixedApi;
