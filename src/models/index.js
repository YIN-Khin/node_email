// "use strict";

// const fs = require("fs");
// const path = require("path");
// const Sequelize = require("sequelize");
// const process = require("process");
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../../config/config.json")[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config,
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".js" &&
//       file.indexOf(".test.js") === -1
//     );
//   })
//   .forEach((file) => {
//     try {
//       const modelExport = require(path.join(__dirname, file));
//       let model;

//       if (typeof modelExport === "function") {
//         model = modelExport(sequelize, Sequelize.DataTypes);
//       } else {
//         model = modelExport;
//       }

//       if (model && model.name) {
//         db[model.name] = model;
//       }
//     } catch (error) {
//       // console.error(`Error loading model ${file}:`, error.message);
//     }
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     try {
//       db[modelName].associate(db);
//     } catch (error) {
//       // console.error(`Error associating model ${modelName}:`, error.message);
//     }
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

// src/models/index.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "railway",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: process.env.NODE_ENV === "production" ? false : console.log,
    pool: {
      max: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 60000,
      charset: "utf8mb4",
    },
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      timestamps: true,
    },
  },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import all models
db.User = require("./user.model")(sequelize, Sequelize);
db.Customer = require("./customer")(sequelize, Sequelize);
db.Product = require("./Product")(sequelize, Sequelize);
db.Category = require("./category")(sequelize, Sequelize);
db.Brand = require("./brand")(sequelize, Sequelize);
db.Supplier = require("./supplierModel")(sequelize, Sequelize);
db.Purchase = require("./Purchase")(sequelize, Sequelize);
db.PurchaseItem = require("./PurchaseItem")(sequelize, Sequelize);
db.Sale = require("./SalesModel")(sequelize, Sequelize);
db.SaleItem = require("./SaleItemModel")(sequelize, Sequelize);
db.Payment = require("./PaymentModel")(sequelize, Sequelize);
db.Setting = require("./Setting")(sequelize, Sequelize);
db.Notification = require("./Notification")(sequelize, Sequelize);
db.Role = require("./role.model")(sequelize, Sequelize);
db.Permission = require("./permission.model")(sequelize, Sequelize);
db.RolePermission = require("./RolePermission")(sequelize, Sequelize);
db.Staff = require("./Staff")(sequelize, Sequelize);
db.StaffModel = require("./StaffModel")(sequelize, Sequelize);

// Define associations if needed
// Example:
// db.Product.belongsTo(db.Category, { foreignKey: 'category_id' });
// db.Product.belongsTo(db.Brand, { foreignKey: 'brand_id' });
// db.Product.belongsTo(db.Supplier, { foreignKey: 'supplier_id' });
// Add more associations as needed

module.exports = db;
