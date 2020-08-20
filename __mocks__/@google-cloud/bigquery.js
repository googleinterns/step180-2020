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
      return [results[query].result];
    };
  }
}

export {BigQuery};
