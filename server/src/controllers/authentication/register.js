const { User } = require('../../models');
const jwtSign = require('./helpers/jwtSign');

module.exports = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const userJson = user.toJSON();
    res.send({
      user: userJson,
      token: jwtSign(userJson),
    });
  } catch (err) {
    res.status(400).send({
      error: 'This email account is already in use.',
    });
  }
};
