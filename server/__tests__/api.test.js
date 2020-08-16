import request from 'supertest';
import app from '../app';

describe('Health Check', () => {
  it('Should be healthy', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('API working');
  });
});

describe('mixed-content', () => {
  // eslint-disable-next-line max-len
  it('Check /top-countries-with-more-government-websites-with-mixed-content is working', async () => {
    const res = await request(app)
        // eslint-disable-next-line max-len
        .get('/api/mixed-content/top-countries-with-more-government-websites-with-mixed-content');
    // eslint-disable-next-line max-len
    expect(res.body.description).toBe('Countries with more government websites that have mixed content');
    expect(res.body.result).not.toBeNull();
    expect(res.body.suggestedVisualizations).not.toBeNull();
  });
});

describe('tls', () => {
  it('Check /tls/tls-version with table 1', async () => {
    const res = await request(app)
        .get('/api/tls/tls-version?table=httparchive.smaller_sample_requests');
    expect(res.body.description).toBe('Number of requests per TLS version');
    expect(res.body.result).not.toBeNull();
  });
});

describe('mixed-content-by-type', () => {
  it('Check /mixed-content/mixed-content-by-type with type = all', async () => {
    const res = await request(app)
        .get('/api/mixed-content/mixed-content-by-type?type=all');
    expect(res.body.description).toBe('Return mixed content request by types');
    expect(res.body.result).not.toBeNull();
  });
});
