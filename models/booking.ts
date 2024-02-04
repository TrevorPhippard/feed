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

    id!: number;
    username!: string;
    role!: string;

    static associate(models:any) {
      // define association here
      Booking.belongsToMany(models.Partner,{
        through:'current_booking'
      })

      Booking.belongsToMany(models.User,{
        through:'userBooking'
      })
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