const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

// Define a model for the 'Bookings' table
const Booking = sequelize.define('Booking', {
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

// Export the Booking model
module.exports = Booking;