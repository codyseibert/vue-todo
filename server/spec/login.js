/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const app = require('../src/app');

function login() {
  return new Promise((resolve, reject) => {
    request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'testing@gmail.com',
        password: '123456',
      })
      .then((res) => {
        resolve(res.body.token);
      })
      .catch(reject);
  });
}

module.exports = login();
