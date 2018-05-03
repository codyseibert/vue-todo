const { Task } = require('../../models');

module.exports = async (req, res) => {
  try {
    const UserId = req.user.id;
    const ProjectId = parseInt(req.params.projectId, 10);
    const task = await Task.create({
      UserId,
      ProjectId,
      ...req.body,
    });
    res.json(task);
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to create the task',
    });
  }
};
