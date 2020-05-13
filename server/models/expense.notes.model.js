module.exports = (sequelize, Sequelize) => {
    const ExpenseNotes = sequelize.define("expense_note", {
      expenseCode: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      note : {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
    return ExpenseNotes;
};