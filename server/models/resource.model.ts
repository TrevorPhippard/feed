'use strict';
import { Model, DataTypes } from 'sequelize'
import sequelize from './sequelize';

interface ResourceAttributes {
  id: number;
  filename: string;
}

class Resource extends Model<ResourceAttributes>

  implements ResourceAttributes {
  // 
  id!: number;
  filename!: string;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {

    // define association here
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
  modelName: 'Resource',
});
export default Resource;
