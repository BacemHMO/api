const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0, //(node:37572) [SEQUELIZE0004] DeprecationWarning: A boolean value was passed to options.operatorsAliases. This is a no-op with v5 and should be removed.

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

db.user        = require("../models/user.model.js")(sequelize, Sequelize);
db.role        = require("../models/role.model.js")(sequelize, Sequelize);
db.restaurants = require("../models/restaurant.model.js")(sequelize, Sequelize);
db.category    = require("../models/category.model.js")(sequelize, Sequelize);
db.orders      = require("../models/order.model.js")(sequelize, Sequelize);
db.items       = require("../models/item.model.js")(sequelize, Sequelize);


//user_roles
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


//restaurant_items

db.restaurants.hasMany(db.items,{ as:"items"});
db.items.belongsTo(db.restaurants, {
  as : "restaurant",
  foreignKey: "restaurantId",
  
});

//user_orders
db.user.hasMany(db.orders, {as:"orders"});
db.orders.belongsTo(db.user, {
  as:"user",
  foreignKey: "userId",
});


//restaurant_orders
db.restaurants.hasMany(db.orders, {as:"orders"});
db.orders.belongsTo(db.restaurants, {
  foreignKey: "restaurantId",
  as:"restaurant"
});



//restaurant_categories
db.category.belongsToMany(db.restaurants, { as:"categories",
 through:"restaurant_categories",
  foreignkey: "restaurantId"
 
});

db.restaurants.belongsToMany(db.category, { as:"restaurats",
  through:"restaurant_categories",
  foreignkey: "categoryId"

});





db.ROLES = ["user", "admin", "moderator"];

module.exports = db;