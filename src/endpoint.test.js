/* eslint-disable */

const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');

const request = supertest(app);

describe('Endpoint test', () => {

  it('Talks with the TEST endpoint', async done => {
    const res = await request.get('/test');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Talking')
    done();
  })

})