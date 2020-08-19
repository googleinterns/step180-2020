/**
 * @fileoverview API Tests
 * Tests for the routes of the API.
 *
 * They use a mock object of the original BigQuery
 * class and it's method, BigQuery.query.
 *
 * To run these tests: yarn test:server
 *
 */
import app from '../app';
import request from 'supertest';

jest.mock('@google-cloud/bigquery');

/**
 * Test suite for the health check endpoint (/api)
 */
describe('Health Check', () => {
  it('Should be healthy', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('API working');
  });
});

/**
 * Test suite for mixed-content endpoint (api/mixed-content)
 */
describe('mixed-content', () => {
  it('Check /top-websites-with-mixed-content', async () => {
    const res = await request(app).get('/api/mixed-content/'+
    'top-websites-with-mixed-content');

    expect(res.body.description).toBe('Top websites with most mixed content'+
    ' and the percentage of mixed content in it.');
    expect(res.body.result).toBeInstanceOf(Array);
    expect(res.body.suggestedVisualizations).toContain('Bar chart');
  });
});
