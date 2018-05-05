const app = require('../../app');
const chai = require('chai');
const request = require('supertest');

const { expect } = chai;
const {
  describe,
  it,
} = global;

describe('Authentication', () => {
  describe('login', () => {
    it('should return 200 status, the user, and token', (done) => {
      request(app)
        .post('/api/auth/login')
        .send({
          email: 'testing@gmail.com',
          password: '123456',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.token).to.be.a('string');
          expect(res.body.user.email).to.equal('testing@gmail.com');
          expect(res.body.user.password).to.be.a('string');
          expect(res.body.user.password).to.not.equal('123456');
          done();
        });
    });
  });
});
