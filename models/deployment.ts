'use strict';
import { Model } from 'sequelize';

interface DeploymentAttributes {
  id: number;
  parter_deployed_to: string;
  body: string;
  user_id: string;
  status: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Deployment extends Model<DeploymentAttributes> 

  implements DeploymentAttributes{

    id!: number;
    parter_deployed_to!: string;
    body!: string;
    user_id!: string;
    status!: string;

    static associate(models:any) {
      // define association here
      Deployment.belongsToMany(models.Partner,{
        through:'partnerDeployments'
      })
      Deployment.belongsToMany(models.User,{
        through:'userDeployment'
      })
    }
  }
  Deployment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
  },
  parter_deployed_to: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  body: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  user_id: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  status: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  }, {
    sequelize,
    modelName: 'Deployment',
  });
  return Deployment;
};