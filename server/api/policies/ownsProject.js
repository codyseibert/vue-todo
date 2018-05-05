const { Project } = require('../../models');

module.exports = async (req, res, next) => {
  try {
    const id = parseInt(req.params.projectId, 10);
    const UserId = req.user.id;
    const project = await Project.findOne({
      where: {
        id,
      },
    });
    if (!project) {
      return res.status(404).send({
        error: `no project of ${id} was found associated with use ${UserId}`,
      });
    }
    if (project.UserId !== UserId) {
      return res.status(403).send({
        error: `the user of ${UserId} does not have access to the project of ${id}`,
      });
    }
    req.project = project;
    next();
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch the project',
    });
  }
};
