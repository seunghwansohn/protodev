module.exports = (sequelize, Sequelize) => {
    const MakerNotes = sequelize.define("maker_note", {
      makerCode : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      note : {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  return MakerNotes;
};