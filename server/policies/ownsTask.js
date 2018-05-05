const { Task } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const id = parseInt(req.params.taskId, 10);
    const userId = req.user.id;
    const task = await Task.findOne({
      where: {
        id,
      },
    });
    if (!task) {
      return res.status(404).send({
        error: `task did not exsist with taskId of ${id}`,
      });
    }
    const project = await task.getProject();
    if (project.userId !== userId) {
      return res.status(403).send({
        error: 'invalid access',
      });
    }
    req.task = task;
    req.project = project;
    next();
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch the project',
    });
  }
};
