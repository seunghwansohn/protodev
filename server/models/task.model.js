module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
    projectCode: {
      type: Sequelize.STRING,
      unique: false,
    },
    idx: {
      type: Sequelize.NUMBER,
      allowNull: false
    },
    desc: {
      type: Sequelize.STRING,
      allowNull: true
    },
  });
  return Task;
};