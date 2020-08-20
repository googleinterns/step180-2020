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
  it(
      'Check /top-countries-with-more-government' +
      '-websites-with-mixed-content is working',
      async () => {
        const res = await request(app).get(
            '/api/mixed-content/top-countries-with' +
          '-more-government-websites-with-mixed-content',
        );
        expect(res.body.description).toBe(
            'Countries with more government websites that have mixed content',
        );
        expect(res.body.result).not.toBeNull();
        expect(res.body.suggestedVisualizations).not.toBeNull();
      },
  );

  it('Check /top-websites-with-mixed-content', async () => {
    const res = await request(app).get(
        '/api/mixed-content/top-websites-with-mixed-content',
    );

    expect(res.body.description).toBe(
        'Top websites with most mixed content' +
        ' and the percentage of mixed content in it.',
    );
    expect(res.body.result).toBeInstanceOf(Array);
    expect(res.body.suggestedVisualizations).toContain('Bar chart');
  });
});

describe('tls', () => {
  it('Check /tls/tls-version with table 1', async () => {
    const res = await request(app).get(
        '/api/tls/tls-version?table=httparchive.smaller_sample_requests',
    );
    expect(res.body.description).toBe('Number of requests per TLS version');
    expect(res.body.result).toMatchObject([
      {
        'id': '"TLS 1.2"',
        'value': 12,
      },
      {
        'id': '"TLS 1.3"',
        'value': 13,
      },
    ]);
  });
});

describe('mixed-content-by-type', () => {
  it('Check /mixed-content/mixed-content-by-type with type = all', async () => {
    const res = await request(app).get(
        '/api/mixed-content/mixed-content-by-type?type=all',
    );
    expect(res.body.description).toBe('Return mixed content request by types');
    expect(res.body.result).toMatchObject([
      {
        'id': 'text',
        'value': 1268,
        'pages': 354,
      },
      {
        'id': 'font',
        'value': 247,
        'pages': 75,
      },
      {
        'id': 'image',
        'value': 2250,
        'pages': 243,
      },
      {
        'id': 'application',
        'value': 1889,
        'pages': 912,
      },
    ]);
  });
});

describe('key-exchange', () => {
  it('Check /tls/key-exchange', async () => {
    const res = await request(app).get('/api/tls/key-exchange');
    expect(res.body.description).toBe('Key exchange algorithm usage');
    expect(res.body.result).toMatchObject([
      {
        'id': '',
        'value': 74131,
      },
      {
        'id': 'ECDHE_RSA',
        'value': 51109,
      },
      {
        'id': 'ECDHE_ECDSA',
        'value': 3272,
      },
      {
        'id': 'RSA',
        'value': 1825,
      },
    ]);
  });
});
