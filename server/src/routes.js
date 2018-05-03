const authenticationController = require('./controllers/authentication');
const projectsController = require('./controllers/projects');
const tasksController = require('./controllers/tasks');

module.exports = (app) => {
  authenticationController(app);
  projectsController(app);
  tasksController(app);
};
