"use strict";
import { Model, DataTypes } from "sequelize"
import sequelize from "./sequelize";

interface TriviaAttributes {
  id: number;
  gameName: string;
  slides: string;
  Trivia_id: string;
}

class Trivia extends Model<TriviaAttributes>

  implements TriviaAttributes {

  id!: number;
  gameName!: string;
  slides!: string;
  Trivia_id!: string;

  static associate() {
  }
}
Trivia.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  gameName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slides: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Trivia_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Trivia",
});
export default Trivia;
