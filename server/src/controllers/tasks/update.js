module.exports = async (req, res) => {
  try {
    const { task } = req;
    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to update the task',
    });
  }
};
