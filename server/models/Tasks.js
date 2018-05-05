module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
  });

  Task.associate = (models) => {
    Task.belongsTo(models.Project);
  };

  return Task;
};
