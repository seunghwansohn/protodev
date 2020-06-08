const config = require("../config/db.config.js");
    
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user         = require("../models/user.model.js")(sequelize, Sequelize);
db.role         = require("../models/role.model.js")(sequelize, Sequelize);
db.item         = require("../models/item.model.js")(sequelize, Sequelize);
db.quote        = require("../models/quote.model.js")(sequelize, Sequelize);
db.client       = require("../models/client.model.js")(sequelize, Sequelize);
db.clientRate   = require("../models/client.rate.model.js")(sequelize, Sequelize);
db.itemPRice    = require("../models/item.Price.model.js")(sequelize, Sequelize);
db.supplier     = require("../models/supplier.model.js")(sequelize, Sequelize);
db.supplierNote = require("../models/supplier.notes.model.js")(sequelize, Sequelize);
db.maker        = require("../models/maker.model.js")(sequelize, Sequelize);
db.makerNote    = require("../models/maker.notes.model.js")(sequelize, Sequelize);
db.project      = require("../models/project.model.js")(sequelize, Sequelize);
db.projectNote  = require("../models/project.notes.model.js")(sequelize, Sequelize);
db.task         = require("../models/task.model.js")(sequelize, Sequelize);
db.expense      = require("../models/expense.model.js")(sequelize, Sequelize);
db.expenseSort  = require("../models/expenseSort.model.js")(sequelize, Sequelize);
db.expenseNote  = require("../models/expense.notes.model.js")(sequelize, Sequelize);
db.files        = require("../models/files.model.js")(sequelize, Sequelize);
db.groups       = require("../models/group.model.js")(sequelize, Sequelize);



db.role.belongsToMany(db.user, {
    through: "user_roles", //through : 둘을 연결해주는 table을 하나 생성하여 여기를 통해 연결됨
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles", 
    foreignKey: "userId",
    otherKey: "roleId"
});
db.user.belongsToMany(db.groups, {
    through: "user_groups", 
    foreignKey: "userId",
    otherKey: "groupId"
});
db.groups.belongsToMany(db.user, {
    through: "user_groups", 
    foreignKey: "groupId",
    otherKey: "usdrId"
});

db.itemPRice.belongsTo(db.item, 
    {as : "specs", through: "item_Price", foreignKey: 'itemCode', targetKey: 'itemCode'})

db.item.belongsTo(db.itemPRice, 
    {as : "price", through: "item_Price", foreignKey: 'itemCode', targetKey: 'itemCode'})


db.item.belongsTo(db.supplier, 
    {as : "supplier", through: "item_supplier", foreignKey: 'supplierCode', targetKey: 'supplierCode'})

db.expense.belongsTo(db.project, 
    {as : "project", through: "expense_project", foreignKey: 'projectCode', targetKey: 'projectCode'})
    
db.item.belongsTo(db.maker, 
    {as : "maker", through: "item_maker", foreignKey: 'makerCode', targetKey: 'makerCode'})
    
db.client.belongsTo(db.clientRate, 
    {as : "rate", through: "client_clientRate", foreignKey: 'clientRate', targetKey: 'clientRate'})

db.supplier.belongsTo(db.supplierNote, 
    {as : "note", through: "supplier_supplierNote", foreignKey: 'supplierCode', targetKey: 'supplierCode'})
        
db.maker.belongsTo(db.makerNote, 
    {as : "note", through: "supplier_makerNote", foreignKey: 'makerCode', targetKey: 'makerCode'})

db.project.hasMany(db.projectNote, 
    {as : "tasks", foreignKey: 'projectCode', sourceKey: 'projectCode'})
        
db.expense.hasMany(db.files, 
    {as : "files", foreignKey: 'relCode', sourceKey: 'expenseCode'})

db.expense.belongsTo(db.expenseSort, 
    {as : "sort", through: "expense_expenseSort", foreignKey: 'sortCode', targetKey: 'sortCode'})

db.expense.belongsTo(db.expenseNote, 
    {as : "note", through: "expense_expenseCode", foreignKey: 'expenseCode', targetKey: 'expenseCode'})

    
    
        
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;