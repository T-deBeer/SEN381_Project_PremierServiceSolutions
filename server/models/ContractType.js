const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const ContractType = sequelize.define(
  "ContractType",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Type: {
      type: DataTypes.STRING(20),
    },
  },
  {
    tableName: "ContractType",
    timestamps: false,
  }
);

module.exports = ContractType;
