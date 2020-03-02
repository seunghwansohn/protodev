module.exports = (sequelize, Sequelize) => {
    const Maker = sequelize.define("maker", {
      makerCode: {
        type: Sequelize.STRING,
        unique: true,
      },
      makerName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: true
      },
    });
    return Maker;
};