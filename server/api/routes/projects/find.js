const { Project } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const UserId = req.user.id;
    const projects = await Project.findAll({
      where: {
        UserId,
      },
    });
    res.send(projects);
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch the projects',
    });
  }
};
