module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
      clientCode: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      clientName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      clientRate: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false      }
    });
    return Client;
};