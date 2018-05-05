const { Project } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const UserId = req.user.id;
    const project = await Project.create({
      UserId,
      ...req.body,
    });
    res.json(project);
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to create the project',
    });
  }
};
