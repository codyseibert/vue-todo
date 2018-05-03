const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).send({
      error: 'expected request to contain a JWT token in the authorization header',
    });
  }

  let decoded;
  try {
    const token = req.headers.authorization.split(' ').slice(-1)[0];
    decoded = jwt.verify(token, config.authentication.jwtSecret);
  } catch (err) {
    return res.status(500).send({
      error: 'error parsing the JWT',
    });
  }
  if (!decoded) {
    return res.status(400).send({
      error: 'invalid JWT token',
    });
  }

  req.user = decoded;
  next();
};
