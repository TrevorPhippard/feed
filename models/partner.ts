'use strict';
import { Model } from 'sequelize';

interface PartnerAttributes {
  id: number;
  name: string;
  current_booking: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Partner extends Model<PartnerAttributes> 

  implements PartnerAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    current_booking!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  }
  Partner.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    current_booking: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  }, {
    sequelize,
    modelName: 'Partner',
  });
  return Partner;
};