const { Task } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = parseInt(req.params.projectId, 10);
    const task = await Task.create({
      userId,
      projectId,
      ...req.body,
    });
    res.json(task);
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to create the task',
    });
  }
};
