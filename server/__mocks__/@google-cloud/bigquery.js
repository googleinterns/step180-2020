/**
 * @fileoverview BigQuery Mock
 * Mock class of BigQuery class used to call BigQuery service.
 *
 * It implements the mock method BigQuery.query which pulls the data
 * from api/queries.json instead of making a database call
 *
 */

import mixedContentQueries from '../../api/mixed-content/queries.json';
import tlsQueries from '../../api/tls/queries.json';

/**
 * Mock class of BigQuery library used for testing.
 */
class BigQuery {
  /**
   * Constructor: mocks the query method which simulates a database
   * call.
   */
  constructor() {
    this.query = ({query, location}) => {
      const result = simulateQueryResult(query);
      return [result];
    };
  }
}

/**
 * Simulates a BigQuery query using data from its respective queries.json
 * Traverses the queries until it finds the one that matches and returns
 * a simulated result (mock).
 *
 * @param {string} simulatedQuery SQL Query that is originally passed
 * to BigQuery.query
 * @return {object} Mock result of that query (every query in the json
 * file has this mock)
 */
const simulateQueryResult = (simulatedQuery) => {
  // Will return undefined if query does not belong to mixed content
  const mixedContentQuery = searchSimulatedQuery(
      simulatedQuery,
      mixedContentQueries,
  );
  if (mixedContentQuery) return mixedContentQuery;

  // Will return undefined if query does not belong to tls
  const tlsQuery = searchSimulatedQuery(simulatedQuery, tlsQueries);
  if (tlsQuery) return tlsQuery;
};

/**
 * Return the query if it belongs to the supplied queries.json
 * It serves as a way to travers the queries, but is not efficient
 * and it doesn't scale pretty well.
 *
 * TODO(ernestognw): Change the way results are mocked to avoid this.
 *
 * @param {string} simulatedQuery SQL Query that is originally passed
 * to BigQuery.query
 * @param {array} queries SQL Query that is originally passed
 * to BigQuery.query
 * @return {object} Mock result of that query if exists in provided queries
 */
const searchSimulatedQuery = (simulatedQuery, queries) => {
  for (const query in queries) {
    // Required because otherwise it will traverse prototype props.
    if (queries.hasOwnProperty(query)) {
      let sql = queries[query].sql;
      // Sometimes query is an array and other times it's an string.
      if (Array.isArray(sql)) {
        sql = sql.join(' ');
      }
      // If a query matches, it will return the mocked result of it.
      if (sql == simulatedQuery) {
        return queries[query].mockResult;
      }
    }
  }
};

export {BigQuery};
