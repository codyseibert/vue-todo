const jwt = require('jsonwebtoken');
const config = require('../../../config/config');

module.exports = (user) => {
  return jwt.sign(user, config.authentication.jwtSecret);
};
