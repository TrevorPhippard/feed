'use strict';
import { Model, DataTypes } from 'sequelize'
import sequelize from './sequelize';

interface TriviaAttributes {
  id: number;
  gameName: string;
  slides: string;
  Trivia_id: string;
}

class Trivia extends Model<TriviaAttributes>

  implements TriviaAttributes {
  // 
  id!: number;
  gameName!: string;
  slides!: string;
  Trivia_id!: string;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {

    // define association here
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
  modelName: 'Trivia',
});
export default Trivia;
