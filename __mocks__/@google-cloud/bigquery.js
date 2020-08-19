import * as results from './results.json';

/**
 * Returns mocked BigQuery for tests
 */
class BigQuery {
  /**
   * Mocks 'query' function in bigQuery
   */
  constructor() {
    this.query = ({query, location}) => {
      return [results[0][query]];
    };
  }
}

export {BigQuery};
