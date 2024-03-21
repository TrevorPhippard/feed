'use strict';
import { Model, DataTypes } from 'sequelize'
import sequelize from './sequelize';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

class User extends Model<UserAttributes>

  implements UserAttributes {
  // 
  id!: number;
  username!: string;
  email!: string;
  password!: string;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    User.belongsToMany(models.Message, {
      through: 'userMessage'
    })

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
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'User',
});
export default User;
