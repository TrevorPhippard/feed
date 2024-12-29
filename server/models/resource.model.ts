"use strict";
import { Model, DataTypes } from "sequelize"
import sequelize from "./sequelize";

interface ResourceAttributes {
  id: number;
  filename: string;
}

class Resource extends Model<ResourceAttributes>

  implements ResourceAttributes {

    id!: number;
  filename!: string;

  static associate() {

  }
}
Resource.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: "Resource",
});
export default Resource;
