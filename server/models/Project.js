module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    title: DataTypes.STRING,
  });

  Project.associate = (models) => {
    Project.hasMany(models.task);
    Project.belongsTo(models.user);
  };

  return Project;
};
