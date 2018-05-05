const jwt = require('jsonwebtoken');

module.exports = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET || 'testing');
};
