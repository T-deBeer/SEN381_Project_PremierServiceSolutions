const { DataTypes } = require("sequelize");
const sequelize = require("../config");
const Client = require("./Client");

const ClientAuthentication = sequelize.define(
  "ClientAuthentication",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ClientID: {
      type: DataTypes.CHAR(36),
    },
    Email: {
      type: DataTypes.STRING(100),
    },
    Password: {
      type: DataTypes.STRING(72),
    },
  },
  {
    tableName: "ClientAuthentication",
    timestamps: false,
  }
);

module.exports = ClientAuthentication;
