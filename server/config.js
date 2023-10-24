const Sequelize = require("sequelize");

module.exports = new Sequelize("sen381", "sen381", "admin-sen381", {
  host: "db4free.net",
  dialect: "mysql",
  port: 3306,
});
