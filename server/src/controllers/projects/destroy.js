module.exports = async (req, res) => {
  try {
    const { project } = req;
    await project.destroy();
    res.json(project);
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to delete the project',
    });
  }
};
