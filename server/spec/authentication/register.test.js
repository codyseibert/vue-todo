const app = require('../../app');
const chai = require('chai');
const request = require('supertest');

const { expect } = chai;
const {
  describe,
  it,
} = global;

describe('Authentication', () => {
  describe('register', () => {
    it('should return 200 status and have created the user', (done) => {
      request(app)
        .post('/api/auth/register')
        .send({
          email: 'yolo@gmail.com',
          password: '123456',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.token).to.be.a('string');
          expect(res.body.user.email).to.equal('yolo@gmail.com');
          expect(res.body.user.password).to.be.a('string');
          expect(res.body.user.password).to.not.equal('123456');
          done();
        });
    });
  });
});
