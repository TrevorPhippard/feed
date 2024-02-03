const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

// Define a model for the 'Users' table
const User = sequelize.define('User', {
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
    role: {
      type: DataTypes.STRING,
      allowNull: true,
  },
});

// Export the User model
module.exports = User;