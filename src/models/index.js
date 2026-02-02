// This file is not used - models are loaded directly in config/db.js
// All model imports and associations are handled in src/config/db.js

// module.exports = {};
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    const modelFactory = require(path.join(__dirname, file));
    if (typeof modelFactory === "function") {
      const model = modelFactory(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  });

// associations
Object.keys(db).forEach((name) => {
  if (db[name].associate) db[name].associate(db);
});

module.exports = db;
