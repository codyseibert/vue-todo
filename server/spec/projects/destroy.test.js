const app = require('../../app');
const chai = require('chai');
const request = require('supertest');
const login = require('../login');
const { Project } = require('../../models');

const { expect } = chai;
const {
  describe,
  it,
  before,
  beforeEach,
} = global;

let token;

describe('Projects', () => {
  before(() => {
    return login.then((t) => {
      token = t;
    });
  });


  describe('destroy', () => {
    let accessibleProjectId;
    let inaccessibleProjectId;

    beforeEach(() => {
      return Project.destroy({
        where: {},
        truncate: true,
      }).then(() => {
        return Project.create({
          title: 'whatsupdawg',
          userId: 1,
        }).then((project) => { accessibleProjectId = project.id; });
      }).then(() => {
        return Project.create({
          title: 'nothingmuchdawg',
          userId: null,
        }).then((project) => { inaccessibleProjectId = project.id; });
      });
    });

    describe('without authorization', () => {
      it('should return 400 status', (done) => {
        request(app)
          .patch(`/api/projects/${accessibleProjectId}`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            done();
          });
      });
    });

    describe('with authorization', () => {
      it('should return a 200 status, update the project, and return the updated object', (done) => {
        request(app)
          .delete(`/api/projects/${accessibleProjectId}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.include({
              title: 'whatsupdawg',
              userId: 1,
            });
            done();
          });
      });

      it('should return a 403 status error on inaccessible projects', (done) => {
        request(app)
          .delete(`/api/projects/${inaccessibleProjectId}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            done();
          });
      });

      it('should return a 404 status error on non existing projects', (done) => {
        request(app)
          .delete('/api/projects/9999999')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            done();
          });
      });
    });
  });
});
