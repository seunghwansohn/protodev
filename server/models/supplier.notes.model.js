module.exports = (sequelize, Sequelize) => {
    const Supplier = sequelize.define("supplier_note", {
      supplierCode : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      note : {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  return Supplier;
};