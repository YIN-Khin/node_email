// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("ecommerce", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
//   port: 3306,
//   logging: false,
// });

// module.exports = sequelize;

// src/config/database.js
require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log("🔧 Database Configuration:");
console.log("Host:", process.env.DB_HOST);
console.log("Port:", process.env.DB_PORT);
console.log("Database:", process.env.DB_NAME);
console.log("User:", process.env.DB_USER);

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

// Test connection immediately
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err.message);
    console.error("Error code:", err.code);
  });

module.exports = sequelize;
