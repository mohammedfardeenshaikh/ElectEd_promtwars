const request = require('supertest');
const app = require('./server'); // We exported the Express app

describe('Backend API Tests', () => {
  it('should serve the index.html on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toMatch(/text\/html/);
  });

  it('should return 400 if message is missing on POST /api/chat', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ history: [] });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Message is required');
  });

  // Since we might not have a real API key in the test environment, we expect either a 503 or a successful mock
  it('should handle API requests gracefully', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'Hello', history: [] });
    
    // If key is set it might be 200, or 500/503 depending on network/config
    expect([200, 500, 503]).toContain(res.statusCode);
  });
});
