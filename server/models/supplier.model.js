module.exports = (sequelize, Sequelize) => {
    const Supplier = sequelize.define("supplier", {
      supplierCode : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      supplierName : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      province : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ceo : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      taxCode : {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
  return Supplier;
};