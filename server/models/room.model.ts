"use strict";
import { Model, DataTypes } from "sequelize"
import sequelize from "./sequelize";

interface RoomAttributes {
  id: number;
  username: string;
  room_id: string;
  online: string;
}

class Room extends Model<RoomAttributes>

  implements RoomAttributes {

  id!: number;
  username!: string;
  room_id!: string;
  online!: string;

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
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  room_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  online: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Room",
});
export default Room;