'use strict';
import { Model, DataTypes } from 'sequelize'
import sequelize from './sequelize';

interface MessageAttributes {
  id: number;
  user_id: string;
  room_id: string;
  message_body: string;
}

class Message extends Model<MessageAttributes>

  implements MessageAttributes {
  // 
  id!: number;
  user_id!: string;
  room_id!: string;
  message_body!: string;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    Message.belongsToMany(models.User, {
      through: 'userMessage'
    })
    Message.belongsToMany(models.Room, {
      through: 'roomMessage'
    })
    // define association here
  }
}
Message.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  room_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  message_body: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Message',
});
export default Message;