const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const TenantService = require('../lib/services/TenantService');

describe('shorten-be routes', () => {
  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    return pool.query(fs.readFileSync('./sql/seedDatabase.sql', 'utf-8'));
  });

  afterAll(pool.end);

  it('allows a user to signup via POST', async() => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ 
        email: 'test@test.com', 
        password: 'password',
        name: 'Jon Arbys',
        ownerId: '1',
        monthlyCost: 400 })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          email: 'test@test.com',
          name: 'Jon Arbys',
          ownerId: '1',
          monthlyCost: 400
        });
      });
  });
    
  it('allows a user to login via POST', async() => {
    const user = await TenantService.create({
      email: 'test@test.com',
      password: 'password',
      name: 'Jon Arbys',
      ownerId: '1',
      monthlyCost: 400
    });
    
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      });
    
    expect(res.body).toEqual({
      id: user.id,
      email: 'test@test.com',
      name: 'Jon Arbys',
      ownerId: '1',
      monthlyCost: 400
    });
  });
    
  it('verifies a user is logged in', async() => {
    const agent = request.agent(app);
    const user = await TenantService.create({
      email: 'test@test.com',
      password: 'password',
      name: 'Jon Arbys',
      ownerId: '1',
      monthlyCost: 400
    });
    
    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      });
    
    const res = await agent
      .get('/api/v1/auth/verify');
    
    expect(res.body).toEqual({
      id: user.id,
      email: 'test@test.com',
      name: 'Jon Arbys',
      ownerId: '1',
      monthlyCost: 400
    });
  });
});
