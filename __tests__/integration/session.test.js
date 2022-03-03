const factory = require('../factories');
const app = require('../../src/app');
const request = require('supertest');
const truncate = require('../utils/truncateTable');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  }, 15000);
  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User')

    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password  })

    expect(response.status).toBe(200)
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: 'senhaerrada'  })

    expect(response.status).toBe(400)
  });

  it('should return JSON Web Token when successful authentication', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    expect(response.body).toHaveProperty("token");
  });

  it('should access private routes with authentication', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${ user.generateJWT() }`)

    expect(response.status).toBe(200);
  });

  it('should not access private routes without JSON Web Token', async () => {
    const response = await request(app)
      .get('/dashboard')

    expect(response.status).toBe(401);
  });

  it('should not access private routes without invalid JSON Web Token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', 'Bearer jojojo');

    expect(response.status).toBe(401);
  });
});
