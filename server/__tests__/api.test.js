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
      'Top websites with most mixed content and the percentage of mixed content in it.',
    );
    expect(res.body.result).toBeInstanceOf(Array);
    expect(res.body.suggestedVisualizations).toContain('Bar chart');
  });

  it('Check /top-government-websites-with-mixed-content', async () => {
    const res = await request(app).get(
      '/api/mixed-content/top-government-websites-with-mixed-content',
    );

    expect(res.body.description).toBe(
      'Top governmental websites with most mixed content and the number of those resources.',
    );
    expect(res.body.result).toBeInstanceOf(Array);
    expect(res.body.suggestedVisualizations).toContain('Bar chart');
  });

  it('Check /top-countries-with-more-government-websites-with-mixed-content', async () => {
    const res = await request(app).get(
      '/api/mixed-content/top-countries-with-more-government-websites-with-mixed-content',
    );

    expect(res.body.description).toBe(
      'Countries with more government' + ' websites that have mixed content',
    );
    expect(res.body.result).toBeInstanceOf(Array);
    expect(res.body.suggestedVisualizations).toContain('Map');
  });

  it('Check /mixed-content-percentage-histogram', async () => {
    const res = await request(app).get(
      '/api/mixed-content/' + '/mixed-content-percentage-histogram',
    );

    expect(res.body.description).toBe(
      'Histogram of the percentage of mixed' + ' content of all websites.',
    );
    expect(res.body.result).toBeInstanceOf(Array);
    expect(res.body.suggestedVisualizations).toContain('Bar chart');
  });

  it('Check /https-percentage-pages', async () => {
    const res = await request(app).get(
      '/api/mixed-content/' + '/https-percentage-pages',
    );

    expect(res.body.description).toBe(
      'Time Series of the percentage of' + ' all pages that load with HTTPS',
      '/api/mixed-content/' + '/https-percentage-pages',
    );

    expect(res.body.description).toBe(
      'Time Series of the percentage of' + ' all pages that load with HTTPS',
    );
    expect(res.body.result).toBeInstanceOf(Array);
    expect(res.body.suggestedVisualizations).toContain('Line chart');
  });

  it('Check with 3 datapoints /https-percentage-pages', async () => {
    const res = await request(app).get(
      '/api/mixed-content/' + '/https-percentage-pages?datapoints=3',
    );

    expect(res.body.description).toBe(
      'Time Series of the percentage of' + ' all pages that load with HTTPS',
    );
    expect(res.body.result).toBeInstanceOf(Array);
    // 3 desktop and mobile datapoints each
    expect(res.body.result.length).toBe(6);
    expect(res.body.suggestedVisualizations).toContain('Line chart');
  });

  it('Check with more datapoints than they exist /https-percentage-pages', async () => {
    const res = await request(app).get(
      '/api/mixed-content/https-percentage-pages?datapoints=1000000',
    );

    expect(res.body.description).toBe(
      'Time Series of the percentage of all pages that load with HTTPS',
    );
    expect(res.body.result).toBeInstanceOf(Array);
    // Desktop and mobile datapoints
    expect(res.body.result.length).not.toBe(2000000);
    expect(res.body.suggestedVisualizations).toContain('Line chart');
  });

  it('Check /https-percentage-requests', async () => {
    const res = await request(app).get(
      '/api/mixed-content/' + '/https-percentage-requests',
    );

    expect(res.body.description).toBe(
      'Time Series of the percentage of' +
        ' all resources that load with HTTPS',
      '/api/mixed-content/' + '/https-percentage-requests',
    );

    expect(res.body.description).toBe(
      'Time Series of the percentage of all resources that load with HTTPS',
    );
    expect(res.body.result).toBeInstanceOf(Array);
    expect(res.body.suggestedVisualizations).toContain('Line chart');
  });

  it('Check /hsts-percentage-requests', async () => {
    const res = await request(app).get(
      '/api/mixed-content/' + '/hsts-percentage-requests',
    );

    expect(res.body.description).toBe(
      'Time Series of the percentage of all desktop resources that contain Strict-Transport-Security header.',
    );

    expect(res.body.description).toBe(
      'Time Series of the percentage of' +
        ' all desktop resources that contain Strict-Transport-Security header.',
    );
    expect(res.body.result).toBeInstanceOf(Array);
    expect(res.body.suggestedVisualizations).toContain('Line chart');
  });
});

describe('tls', () => {
  it('Check /tls/tls-version with table 1', async () => {
    const res = await request(app).get(
      '/api/tls/tls-version?table=httparchive.smaller_sample_requests',
    );
    expect(res.body.description).toBe('Number of requests per TLS version');
    expect(res.body.result).not.toBeNull();
  });
});

describe('mixed-content-by-type', () => {
  it('Check /mixed-content/mixed-content-by-type with type = all', async () => {
    const res = await request(app).get(
      '/api/mixed-content/mixed-content-by-type?type=all',
    );
    expect(res.body.description).toBe('Return mixed content request by types');
    expect(res.body.result).not.toBeNull();
  });
});

describe('key-exchange', () => {
  it('Check /tls/key-exchange', async () => {
    const res = await request(app).get('/api/tls/key-exchange');
    expect(res.body.description).toBe('');
    expect(res.body.result).not.toBeNull();
  });
});
