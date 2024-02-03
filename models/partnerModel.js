const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

// Define a model for the 'Partners' table
const Partner = sequelize.define('Partner', {
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
});

// Export the Partner model
module.exports = Partner;