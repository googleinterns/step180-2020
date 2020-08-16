import queries from '../../api/mixed-content/queries.json';

/**
 * Mock class of BigQuery library used for testing.
 */
class BigQuery {
  /**
   * Constructor, mocks the query method.
   */
  constructor() {
    this.query = ({query, location}) => {
      const result = simulateQueryResult(query);
      return [result];
    };
  }
}

/**
 * Simulates a BigQuery query using data from api/mixed-content/queries.json
 * Traverses the queries until it finds the one that matches and returns
 * a simulated result (mock).
 *
 * @param {string} simulatedQuery SQL Query that is originally passed
 * to BigQuery.query
 * @return {object} Mock result of that query (every query in the json
 * file has this mock)
 */
const simulateQueryResult = (simulatedQuery) => {
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
  return null;
};


export {BigQuery};
