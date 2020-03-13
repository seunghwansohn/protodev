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
    });
  return supplierNote;
};