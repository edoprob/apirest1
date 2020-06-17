const Sequelize = require("sequelize");
const connection = new Sequelize("api-rest", "root", "root", {
    port: 3306,
    dialect: "mysql",
    host: "localhost",
    timezone: "-03:00"
});

module.exports = connection;