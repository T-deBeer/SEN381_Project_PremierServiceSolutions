const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

const ClientType = sequelize.define(
  "ClientType",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Type: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: "ClientType",
    timestamps: false,
  }
);

module.exports = ClientType;
