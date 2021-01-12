/* eslint-disable */

const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');

const request = supertest(app);

describe('Endpoint test', () => {
  beforeAll(done => {
    done()
  })

  it('Talks with the TEST endpoint', async done => {
    const res = await request.get('/test');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Talking')
    done();
  })

  it('Creates a new URL Object', async done => {
    const res = await (await request
      .post('/'))
      .send({longURL: 'www.mytesturl.com', shortURL: 'test'});
    expect(res.status).toBe(201);
  })

  afterAll(done => {
    server.close();
    done();
});

})