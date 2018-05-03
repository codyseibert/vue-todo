const find = require('./find');
const create = require('./create');
const update = require('./update');
const destroy = require('./destroy');
const isAuthenticated = require('../../policies/isAuthenticated');
const ownsProject = require('./policy/ownsProject');

module.exports = (app) => {
  app.get('/projects', isAuthenticated, find);
  app.post('/projects', isAuthenticated, create);
  app.patch('/projects/:projectId', isAuthenticated, ownsProject, update);
  app.delete('/projects/:projectId', isAuthenticated, ownsProject, destroy);
};
