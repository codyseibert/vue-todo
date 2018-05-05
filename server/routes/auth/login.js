const { User } = require('../../models');
const jwtSign = require('./helpers/jwtSign');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(403).send({
        error: 'The login information was incorrect',
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(403).send({
        error: 'The login information was incorrect',
      });
    }

    const userJson = user.toJSON();

    res.send({
      user: userJson,
      token: jwtSign(userJson),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: 'An error has occured trying to log in',
    });
  }
};
