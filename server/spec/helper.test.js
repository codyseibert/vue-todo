const { sequelize, User } = require('../src/models');

const { before } = global;

before(() => {
  return sequelize.sync({ force: true })
    .then(() => {
      return User.create({
        email: 'testing@gmail.com',
        password: '123456',
      });
    });
});

