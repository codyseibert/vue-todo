module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: DataTypes.STRING,
  });

  Project.associate = (models) => {
    Project.hasMany(models.Task);
    Project.belongsTo(models.User);
  };

  return Project;
};
