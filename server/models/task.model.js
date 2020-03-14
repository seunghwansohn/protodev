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
    allocatedTo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    madeBy: {
      type: Sequelize.STRING,
      allowNull: true
    },
    showedTo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dueDateTime: {
      type: Sequelize.DATE,
      allowNull: true
    },
    urgent: {
      type: Sequelize.NUMBER,
      allowNull: true
    },
    grade: {
      type: Sequelize.NUMBER,
      allowNull: true
    },
    belongedId: {
      type: Sequelize.NUMBER,
      allowNull: true
    },


  });
  return Task;
};