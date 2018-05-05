
module.exports = async (req, res) => {
  try {
    const { project } = req;
    await project.update(req.body);
    res.json(project);
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to update the project',
    });
  }
};
