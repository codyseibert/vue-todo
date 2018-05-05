const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).send({
      error: 'expected request to contain a JWT token in the authorization header',
    });
  }

  let decoded;
  try {
    const token = req.headers.authorization.split(' ').slice(-1)[0];
    decoded = jwt.verify(token, process.env.JWT_SECRET || 'testing');
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
