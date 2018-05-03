const register = require('./register');
const login = require('./login');

module.exports = (app) => {
  app.post('/register', register);
  app.post('/login', login);
};
