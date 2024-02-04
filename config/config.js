export default {
    development: {
        username: 'root',
        password: 'root',
        storage:  '../database_test.sqlite',
        host: 'localhost',
        dialect: 'sqlite',
        // logging: console.log
    },
    production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mysql"
    }
};