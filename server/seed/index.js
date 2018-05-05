const {
  sequelize,
  User,
  Project,
  Task,
} = require('..//models');

const users = require('./users.json');
const projects = require('./projects.json');
const tasks = require('./tasks.json');

sequelize.sync({ force: true })
  .then(async () => {
    await Promise.all(
      users.map((user) => {
        return User.create(user);
      }),
    );

    await Promise.all(
      projects.map((project) => {
        return Project.create(project);
      }),
    );

    await Promise.all(
      tasks.map((task) => {
        return Task.create(task);
      }),
    );
  });
