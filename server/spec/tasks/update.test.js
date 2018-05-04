const app = require('../../src/app');
const chai = require('chai');
const request = require('supertest');
const login = require('../login');
const { Project, Task } = require('../../src/models');

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
  let taskId;
  let inaccessibleTaskId;

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
        UserId: 1,
      }).then((project) => { accessibleProjectId = project.id; });
    }).then(() => {
      return Project.create({
        title: 'nothingmuchdawg',
        UserId: null,
      }).then((project) => { inaccessibleProjectId = project.id; });
    }).then(() => {
      return Task.create({
        description: 'hello world',
        ProjectId: accessibleProjectId,
      }).then((task) => { taskId = task.id; });
    })
      .then(() => {
        return Task.create({
          description: 'hello world',
          ProjectId: inaccessibleProjectId,
        }).then((task) => { inaccessibleTaskId = task.id; });
      });
  });

  describe('update', () => {
    describe('without authorization', () => {
      it('should return 400 status', (done) => {
        request(app)
          .patch(`/api/tasks/${taskId}`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            done();
          });
      });
    });

    describe('with authorization', () => {
      it('should return 200 status and only the projects associate with this users token', (done) => {
        request(app)
          .patch(`/api/tasks/${taskId}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            description: 'glhf',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.include({
              description: 'glhf',
              ProjectId: accessibleProjectId,
            });
            done();
          });
      });

      it('should return 403 on projects that the user does not have acccess to', (done) => {
        request(app)
          .patch(`/api/tasks/${inaccessibleTaskId}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            done();
          });
      });

      it('should return 404 on tasks that do not exist', (done) => {
        request(app)
          .patch(`/api/tasks/${999999}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            done();
          });
      });
    });
  });
});
