import * as results from './results.json';

/**
 * Returns mocked BigQuery
 */
class BigQuery {
  constructor() {
    this.query = ({query, location}) => {
      return [results[0][query]];
    };
  }
}


export {BigQuery};
