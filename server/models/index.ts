"use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import sequelize from "./sequelize";

const basename = path.basename(__filename);
const db: any = {};

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".ts");
  })
  .forEach(async (file: any) => {
      const mod = await import(path.join(__dirname, file));
      const model = mod(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;