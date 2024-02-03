const { Sequelize } = require('sequelize');

// Connect to SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: (...msg) => console.log(msg) // Displays all log function call parameters
});

// Export the Sequelize instance
module.exports = sequelize;