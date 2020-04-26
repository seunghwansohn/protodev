module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define("expense", {
      description: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
      },
      sort: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
      },
      unitCost: {
        type: Sequelize.NUMBER,
        unique: false,
        allowNull: false
      },
      qty: {
        type: Sequelize.NUMBER,
        unique: false,
        allowNull: false
      },
      authorizedBy: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
      },
      fileAddr: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
      },
      memo: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
      },
      memoAuthorized: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
      },
      projectCode: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
      },
    });
    return Expense;
};