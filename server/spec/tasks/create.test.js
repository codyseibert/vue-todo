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
    });
  });

  describe('create', () => {
    describe('without authorization', () => {
      it('should return 400 status', (done) => {
        request(app)
          .post(`/api/projects/${accessibleProjectId}/tasks`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            done();
          });
      });
    });

    describe('with authorization', () => {
      it('should return 200 status and created object', (done) => {
        request(app)
          .post(`/api/projects/${accessibleProjectId}/tasks`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            description: 'yolo',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.include({
              description: 'yolo',
              projectId: accessibleProjectId,
            });
            done();
          });
      });

      it('should return 403 when trying to create a task on an inaccessible project', (done) => {
        request(app)
          .post(`/api/projects/${inaccessibleProjectId}/tasks`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            description: 'yolo',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            done();
          });
      });

      it('should return 404 when trying to create a task on an non-existing project', (done) => {
        request(app)
          .post(`/api/projects/${9999999}/tasks`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            description: 'yolo',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            done();
          });
      });
    });
  });
});
