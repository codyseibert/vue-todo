const app = require('../../app');
const chai = require('chai');
const request = require('supertest');
const login = require('../login');
const { Project } = require('../../models');

const { expect } = chai;
const { describe, it, before } = global;

let token;

describe('Projects', () => {
  before(() => {
    return login.then((t) => {
      token = t;
    });
  });

  describe('find', () => {
    describe('without authorization', () => {
      it('should return 400 status', (done) => {
        request(app)
          .get('/api/projects')
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            done();
          });
      });
    });

    describe('with authorization', () => {
      before(() => {
        return Project.destroy({
          where: {},
          truncate: true,
        }).then(() => {
          return Project.create({
            title: 'whatsupdawg',
            userId: 1,
          });
        }).then(() => {
          return Project.create({
            title: 'nothingmuchdawg',
            userId: null,
          });
        });
      });

      it('should return 200 status and only the projects associate with this users token', (done) => {
        request(app)
          .get('/api/projects')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.length).to.equal(1);
            expect(res.body[0]).to.include({
              title: 'whatsupdawg',
              userId: 1,
            });
            done();
          });
      });
    });
  });
});
