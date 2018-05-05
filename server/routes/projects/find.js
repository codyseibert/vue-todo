const { Project } = require('../../models');

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await Project.findAll({
      where: {
        userId,
      },
    });
    res.send(projects);
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch the projects',
    });
  }
};
