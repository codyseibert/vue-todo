const app = require('../../app');
const chai = require('chai');
const request = require('supertest');
const login = require('../login');
const { Project, Task } = require('../../models');

const { expect } = chai;
const {
  describe,
  it,
  before,
  beforeEach,
} = global;

let token;

describe('Tasks', () => {
  let accessibleProjectId;
  let inaccessibleProjectId;

  before(() => {
    return login.then((t) => {
      token = t;
    });
  });

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
    }).then(() => {
      return Task.create({
        description: 'hello world',
        projectId: accessibleProjectId,
      });
    });
  });

  describe('find', () => {
    describe('without authorization', () => {
      it('should return 400 status', (done) => {
        request(app)
          .get(`/api/projects/${accessibleProjectId}/tasks`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            done();
          });
      });
    });

    describe('with authorization', () => {
      it('should return 200 status and only the projects associate with this users token', (done) => {
        request(app)
          .get(`/api/projects/${accessibleProjectId}/tasks`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.length).to.equal(1);
            expect(res.body[0]).to.include({
              description: 'hello world',
              projectId: accessibleProjectId,
            });
            done();
          });
      });

      it('should return 403 on projects that the user does not have acccess to', (done) => {
        request(app)
          .get(`/api/projects/${inaccessibleProjectId}/tasks`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            done();
          });
      });

      it('should return 404 on projects that do not exist', (done) => {
        request(app)
          .get(`/api/projects/${9999999}/tasks`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            done();
          });
      });
    });
  });
});
