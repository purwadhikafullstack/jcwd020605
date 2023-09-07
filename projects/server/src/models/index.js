"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.UserModel = require("./user")(sequelize, Sequelize);
db.TokenModel = require("./token")(sequelize, Sequelize);
db.ReviewModel = require("./review")(sequelize, Sequelize);
db.OrderModel = require("./order")(sequelize, Sequelize);
db.OrderModel = require("./order")(sequelize, Sequelize);
db.SpecialPriceModel = require("./specialprice")(sequelize, Sequelize);
db.TenantModel = require("./tenant")(sequelize, Sequelize);
db.PropertyModel = require("./property")(sequelize, Sequelize);
db.RoomModel = require("./room")(sequelize, Sequelize);
db.CitiesModel = require("./city")(sequelize, Sequelize);
db.ProvinceModel = require("./province")(sequelize, Sequelize);
db.ProductCategoriesMaster = require("./product_category_master")(
  sequelize,
  Sequelize
);
db.PropertyImages = require("./property_images")(sequelize, Sequelize);
db.UnavailableRoomsModel = require("./unavailableRooms")(sequelize, Sequelize);

// -------------------  property  ---------------------

db.PropertyImages.belongsTo(db.PropertyModel, {
  foreignKey: "property_id",
});

db.PropertyModel.hasMany(db.PropertyImages, {
  foreignKey: "property_id",
});

db.PropertyModel.belongsTo(db.CitiesModel, {
  foreignKey: "city_id",
  targetKey: "city_id",
});

// -------------------  room  ---------------------

db.RoomModel.belongsTo(db.PropertyModel, {
  foreignKey: "property_id",
});

db.PropertyModel.hasMany(db.RoomModel, {
  foreignKey: "property_id",
});

db.ProvinceModel.hasMany(db.CitiesModel, {
  foreignKey: "province_id",
});

// -------------------  Special price  ---------------------

db.SpecialPriceModel.belongsTo(db.RoomModel, {
  foreignKey: "room_id",
});

db.RoomModel.hasMany(db.SpecialPriceModel, {
  foreignKey: "room_id",
});

db.UnavailableRoomsModel.belongsTo(db.RoomModel, {
  foreignKey: "room_id",
});

db.RoomModel.hasMany(db.UnavailableRoomsModel, {
  foreignKey: "room_id",
});

// -------------------  order  ---------------------

db.OrderModel.belongsTo(db.RoomModel, {
  foreignKey: "room_id",
});

db.RoomModel.hasMany(db.OrderModel, {
  foreignKey: "room_id",
});

db.OrderModel.belongsTo(db.UserModel, {
  foreignKey: "user_id",
});

db.UserModel.hasMany(db.OrderModel, {
  foreignKey: "user_id",
});

// -------------------  token  ---------------------

db.TokenModel.belongsTo(db.UserModel, {
  foreignKey: "user_id",
});

db.UserModel.hasMany(db.TokenModel, {
  foreignKey: "user_id",
});

// -------------------  review  ---------------------

db.ReviewModel.belongsTo(db.UserModel, {
  foreignKey: "user_id",
});

db.UserModel.hasMany(db.ReviewModel, {
  foreignKey: "user_id",
});

db.ReviewModel.belongsTo(db.RoomModel, {
  foreignKey: "room_id",
});

db.RoomModel.hasMany(db.ReviewModel, {
  foreignKey: "room_id",
});

// -------------------  ProductCategoriesMaster  ---------------------

// db.ProductCategoriesMaster.belongsTo(db.CitiesModel, {
//   foreignKey: "city_id",
// });

// db.CitiesModel.hasMany(db.ProductCategoriesMaster, {
//   foreignKey: "city_id",
// });

db.PropertyModel.belongsTo(db.ProductCategoriesMaster, {
  foreignKey: "pcm_id",
});

db.ProductCategoriesMaster.hasMany(db.PropertyModel, {
  foreignKey: "pcm_id",
});

module.exports = db;
