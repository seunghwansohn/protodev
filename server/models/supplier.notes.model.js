module.exports = (sequelize, Sequelize) => {
    const Supplier = sequelize.define("supplier_note", {
      supplierCode : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      notes : {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  return Supplier;
};