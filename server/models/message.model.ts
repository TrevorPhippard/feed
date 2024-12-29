"use strict";
import { Model, DataTypes } from "sequelize"
import sequelize from "./sequelize";

interface MessageAttributes {
  id: number;
  user_id: string;
  room_id: string;
  message_body: string;
}

class Message extends Model<MessageAttributes>

  implements MessageAttributes {

  id!: number;
  user_id!: string;
  room_id!: string;
  message_body!: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  modelName: "Message",
});
export default Message;