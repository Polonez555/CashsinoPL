const request = require('supertest');
const app = require('../../src/index');

describe('GET /api/health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('CashsinoPL API');
  });
});

describe('POST /api/roulette/spin', () => {
  it('returns a valid spin result', async () => {
    const res = await request(app).post('/api/roulette/spin');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.result).toHaveProperty('number');
    expect(res.body.result).toHaveProperty('color');
    expect(res.body.result.number).toBeGreaterThanOrEqual(0);
    expect(res.body.result.number).toBeLessThanOrEqual(36);
  });

  it('result color is one of green, red, black', async () => {
    const res = await request(app).post('/api/roulette/spin');
    expect(['green', 'red', 'black']).toContain(res.body.result.color);
  });
});

describe('POST /api/roulette/bet', () => {
  it('returns outcome for a color bet', async () => {
    const res = await request(app)
      .post('/api/roulette/bet')
      .send({ bet: { type: 'color', value: 'red', amount: 100 } });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('result');
    expect(res.body).toHaveProperty('outcome');
    expect(typeof res.body.outcome.won).toBe('boolean');
  });

  it('returns outcome for a straight bet', async () => {
    const res = await request(app)
      .post('/api/roulette/bet')
      .send({ bet: { type: 'straight', value: 17, amount: 50 } });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('returns 400 when bet payload is missing', async () => {
    const res = await request(app).post('/api/roulette/bet').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('returns 400 for negative bet amount', async () => {
    const res = await request(app)
      .post('/api/roulette/bet')
      .send({ bet: { type: 'color', value: 'red', amount: -5 } });
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for zero bet amount', async () => {
    const res = await request(app)
      .post('/api/roulette/bet')
      .send({ bet: { type: 'color', value: 'red', amount: 0 } });
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for unknown bet type', async () => {
    const res = await request(app)
      .post('/api/roulette/bet')
      .send({ bet: { type: 'invalid', value: 'red', amount: 10 } });
    expect(res.statusCode).toBe(400);
  });
});
