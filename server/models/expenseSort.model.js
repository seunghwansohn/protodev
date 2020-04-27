module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define("expenseSort", {
      sortCode: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      sortName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },

    });
    return Expense;
};