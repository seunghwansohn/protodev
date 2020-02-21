module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("item", {
    itemCode: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    itemName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    weight: {
      type: Sequelize.NUMBER,
      allowNull: true
    },
    width: {
      type: Sequelize.NUMBER,
      allowNull: true
    },
    depth: {
      type: Sequelize.NUMBER,
      allowNull: true
    },
    height: {
      type: Sequelize.NUMBER,
      allowNull: true
    },
    importTaxRate: {
      type: Sequelize.NUMBER,
      allowNull: true
    },
    maker: {
      type: Sequelize.STRING,
      allowNull: true
    },
    supplierCode: {
      type: Sequelize.STRING,
      allowNull: true
    },
    makerModelNo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    description:  {
      type: Sequelize.TEXT,
      allowNull: true
    },
    notes:  {
      type: Sequelize.TEXT,
      allowNull: true
    }
  });
  return Item;
};