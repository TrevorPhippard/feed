import { Sequelize } from 'sequelize'
  
// Connect to SQLite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    // logging: (...msg: any) => console.log(msg) // Displays all log function call parameters
});

export default sequelize