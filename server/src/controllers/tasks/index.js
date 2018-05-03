const find = require('./find');
const create = require('./create');
const update = require('./update');
const destroy = require('./destroy');
const isAuthenticated = require('../../policies/isAuthenticated');
const ownsProject = require('../projects/policy/ownsProject');
const ownsTasks = require('./ownsTask');

module.exports = (app) => {
  app.get('/projects/:projectId/tasks', isAuthenticated, ownsProject, find);
  app.post('/projects/:projectId/tasks', isAuthenticated, ownsProject, create);
  app.patch('/tasks/:taskId', isAuthenticated, ownsTasks, update);
  app.delete('/tasks/:taskId', isAuthenticated, ownsTasks, destroy);
};
