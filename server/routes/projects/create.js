const { Project } = require('../../models');

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const project = await Project.create({
      userId,
      ...req.body,
    });
    res.json(project);
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to create the project',
    });
  }
};
