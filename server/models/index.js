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

db.itemPRice.belongsTo(db.item, 
    {as : "specs", through: "item_Price", foreignKey: 'itemCode', targetKey: 'itemCode'})

db.item.belongsTo(db.itemPRice, 
    {as : "Price", through: "item_Price", foreignKey: 'itemCode', targetKey: 'itemCode'})
      
db.client.belongsTo(db.clientRate, 
    {as : "rate", through: "client_clientRate", foreignKey: 'clientRate', targetKey: 'clientRate'})

db.supplier.belongsTo(db.supplierNote, 
    {as : "note", through: "supplier_supplierNote", foreignKey: 'supplierCode', targetKey: 'supplierCode'})
        
db.maker.belongsTo(db.makerNote, 
    {as : "note", through: "supplier_makerNote", foreignKey: 'makerCode', targetKey: 'makerCode'})

db.project.hasMany(db.projectNote, 
    {as : "notes", foreignKey: 'projectCode', sourceKey: 'projectCode'})
        
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;