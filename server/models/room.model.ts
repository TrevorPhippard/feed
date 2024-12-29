"use strict";
import { Model, DataTypes } from "sequelize"
import sequelize from "./sequelize";

interface RoomAttributes {
  id: number;
  user_id: string;
  room_id: string;
  msgs: string;
}

class Room extends Model<RoomAttributes>

  implements RoomAttributes {

  id!: number;
  user_id!: string;
  room_id!: string;
  msgs!: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static associate(models: any) {
    Room.belongsToMany(models.User, {
      through: "userRoom"
    })
    Room.belongsToMany(models.Message, {
      through: "roomMessage"
    })
  }
}
Room.init({
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
  msgs: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Room",
});
export default Room;