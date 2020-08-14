import request from 'supertest';
import app from '../app';

jest.mock('@google-cloud/bigquery');

describe('Health Check', () => {
  it('Should be healthy', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('API working');
  });
});

describe('mixed-content', () => {
  it('Check /top-countries-with-more-government-websites-with-mixed-content is working', async () => {
    const res = await request(app).get('/api/mixed-content/top-countries-with-more-government-websites-with-mixed-content');
    expect(res.body.description).toBe('Countries with more government websites that have mixed content');
    expect(res.body.result).not.toBeNull();
    expect(res.body.suggestedVisualizations).not.toBeNull();
  });
});
