const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: (...msg) => console.log(msg) // Displays all log function call parameters
});

class User extends Model {}

User.init({
  login_id: DataTypes.STRING,
  user_email: DataTypes.STRING,
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  user_name: DataTypes.STRING,
  avatar_dirct: DataTypes.STRING,
}, { sequelize, modelName: 'user' });



(async () => {
  await sequelize.sync();
  const jane = await User.create({
    login_id: '01234',
    user_email: 'pizza@pizza.com',
    first_name: 'pizza',
    last_name: 'pizzaman',
    user_name: 'enoughSlices',
    avatar: 'pizza.png',
  });
  
  console.log(jane.toJSON());
  console.log(JSON.stringify(jane, null, 4)); // This is also good!

})();