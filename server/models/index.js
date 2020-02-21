const config = require("../config/db.config.js");
    
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
<<<<<<< HEAD
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
=======
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
<<<<<<< HEAD
db.item = require("../models/item.model.js")(sequelize, Sequelize);
db.quote = require("../models/quote.model.js")(sequelize, Sequelize);
db.client = require("../models/client.model.js")(sequelize, Sequelize);
db.clientRate = require("../models/client.rate.model.js")(sequelize, Sequelize);
db.itemPRice = require("../models/item.Price.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles", //through : 둘을 연결해주는 table을 하나 생성하여 여기를 통해 연결됨
=======

db.role.belongsToMany(db.user, {
    through: "user_roles",
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
<<<<<<< HEAD
    through: "user_roles", 
=======
    through: "user_roles",
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
    foreignKey: "userId",
    otherKey: "roleId"
});

<<<<<<< HEAD
db.itemPRice.belongsTo(db.item, 
    {as : "specs", through: "item_Price", foreignKey: 'itemCode', targetKey: 'itemCode'})

db.item.belongsTo(db.itemPRice, 
    {as : "Price", through: "item_Price", foreignKey: 'itemCode', targetKey: 'itemCode'})
      
db.client.belongsTo(db.clientRate, 
    {as : "rate", through: "client_clientRate", foreignKey: 'clientRate', targetKey: 'clientRate'})


        
=======
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;