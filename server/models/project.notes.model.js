module.exports = (sequelize, Sequelize) => {
    const supplierNote = sequelize.define("project_note", {
      projectCode : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      note : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      belongedIdx : {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
      level : {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
      idx : {
        type: Sequelize.NUMBER,
        allowNull: false,
      }
    });
  return supplierNote;
};