const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

// Define a model for the 'Deployments' table
const Deployment = sequelize.define('Deployment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    parter_deployed_to: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});





// Export the Deployment model
module.exports = Deployment;