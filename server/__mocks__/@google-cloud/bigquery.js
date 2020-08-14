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

// Gets a sql string
const simulateQueryResult = (simulatedQuery) => {
  for (const query in queries) {
    if (queries.hasOwnProperty(query)) {
      let sql = queries[query].sql;
      if (Array.isArray(sql)) {
        sql = sql.join(' ');
      }
      if (sql == simulatedQuery) {
        return queries[query].mockResult;
      }
    }
  }
  return null;
};


export {BigQuery};
