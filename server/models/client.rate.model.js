module.exports = (sequelize, Sequelize) => {
    const ClientRate = sequelize.define("clientRate", {
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true,
        allowNull: false
    },
    clientRate: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    increaseRate: {
        type: Sequelize.NUMBER,
        unique: false,
        allowNull: false      }
    });
    return ClientRate;
};