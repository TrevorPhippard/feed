'use strict';
import { Model } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  role: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<UserAttributes> 

  implements UserAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    username!: string;
    role!: string;

    static associate(models:any) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
  },

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};