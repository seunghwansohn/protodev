module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("project", {
    projectCode: {
        type: Sequelize.STRING,
        unique: true,
    },
    projectName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    client: {
        type: Sequelize.STRING,
        allowNull: true
    },
    estimatedAmount : {
        type : Sequelize.NUMBER,
    },
    stage : {
        type : Sequelize.NUMBER,
    },
    light : {
      type : Sequelize.NUMBER,
    },
    estimatedTime: {
      type : Sequelize.NUMBER
    }
  });
  return Project;
};