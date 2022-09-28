const sequelize = require("sequelize");
const connection = new sequelize("blog","root","junior123",{
   host: "localhost",
   dialect: "mysql",
});

module.exports = connection