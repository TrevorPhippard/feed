"use strict";
import { Model, DataTypes } from "sequelize"
import sequelize from "./sequelize";

interface MessageAttributes {
  id: number;
  username: string;
  room_id: string;
  message_body: string;
}

class Message extends Model<MessageAttributes>

  implements MessageAttributes {

  id!: number;
  username!: string;
  room_id!: string;
  message_body!: string;

  static associate(models: any) {
    Message.belongsToMany(models.User, {
      through: "userMessage"
    })
    Message.belongsToMany(models.Room, {
      through: "roomMessage"
    })
  }
}
Message.init({
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
  modelName: "Message",
});
export default Message;