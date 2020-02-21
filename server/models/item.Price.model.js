module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("itemPrice", {
    itemCode: {
      type: Sequelize.STRING,
      unique: true,
    },
    VNPrice: {
      type: Sequelize.NUMBER,
      allowNull: true
    },
    stkVVar: {
      type: Sequelize.NUMBER,
      allowNull: true
    },
    stkCVar: {
      type: Sequelize.NUMBER,
      allowNull: true
    },
    buyingPKR: {
      type: Sequelize.NUMBER,
      allowNull: true
    }
  });
  return Item;
};