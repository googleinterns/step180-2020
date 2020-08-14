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
  it('Check /top-websites-with-mixed-content', async () => {
    const res = await request(app).get('/api/mixed-content/top-websites-with-mixed-content');
    expect(res.body.description).toBe('Top websites with most mixed content and the percentage of mixed content in it.');
    expect(res.body.result).toBeInstanceOf(Array);
    expect(res.body.suggestedVisualizations).toContain('Bar chart');
  });
});
