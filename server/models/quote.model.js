module.exports = (sequelize, Sequelize) => {
    const Quote = sequelize.define("quote", {
      quoteNo : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quoteDate : {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      itemNo : {
        type: Sequelize.NUMBER,
        defaultValue : 1
      },
      itemCode: {
        type: Sequelize.STRING,
        defaultValue : 'eej'
      },
      qty: {
        type: Sequelize.NUMBER,
        defaultValue : 1
      },
      priceRate: {
        type: Sequelize.NUMBER,
        defaultValue : 1
      }
    });
  return Quote;
};