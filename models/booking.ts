'use strict';
import { Model } from 'sequelize';

interface BookingAttributes {
  id: number;
  username: string;
  role: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Booking extends Model<BookingAttributes> 

  implements BookingAttributes{
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
  Booking.init({
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
    modelName: 'Booking',
  });
  return Booking;
};