module.exports = async (req, res) => {
  try {
    const { task } = req;
    await task.destroy();
    res.json(task);
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to delete the task',
    });
  }
};
