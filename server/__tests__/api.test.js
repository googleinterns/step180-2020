import app from '../app';
import request from 'supertest';

describe('Health Check', () => {
  it('Should be healthy', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('API working');
  });
});

describe('tls', () => {
  it('Check /tls/tls-version with table 1', async () => {
    const res = await request(app)
        .get('/api/tls/tls-version?table=httparchive.smaller_sample_requests');
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
    const res = await request(app)
        .get('/api/mixed-content/mixed-content-by-type?type=all');
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
