'use strict';
import { Model, DataTypes } from 'sequelize'
import sequelize from '../models/sequelize';

interface PartnerAttributes {
  id: number;
  name: string;
  current_booking: string;
}

  class Partner extends Model<PartnerAttributes> 

  implements PartnerAttributes{
   
    id!: number;
    name!: string;
    current_booking!: string;

    static associate(models:any) {
      // define association here
      Partner.belongsToMany(models.Deployment,{
        through:'partnerDeployments'
      })
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
  export default  Partner;
