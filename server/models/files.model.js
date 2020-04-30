module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define("file", {
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      relCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addresses: {
        type: Sequelize.STRING,
        allowNull: false
      },

    });
    return Expense;
};