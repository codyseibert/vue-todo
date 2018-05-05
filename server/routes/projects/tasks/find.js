const { Task } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId, 10);
    const tasks = await Task.findAll({
      where: {
        projectId,
      },
    });
    res.send(tasks);
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch the tasks',
    });
  }
};
