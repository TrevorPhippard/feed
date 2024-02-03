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

    id!: number;
    username!: string;
    role!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      User.belongsToMany(models.Booking,{
        through:'userBooking'
      })
      User.belongsToMany(models.Deployment,{
        through:'userDeployment'
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