const Sequelize = require("sequelize");
const connection = require("../database");
const User = connection.define("users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pass: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
User.sync({force: false});

module.exports = User;