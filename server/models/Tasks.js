module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('task', {
    description: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
  });

  Task.associate = (models) => {
    Task.belongsTo(models.project);
  };

  return Task;
};
