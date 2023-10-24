const { DataTypes } = require("sequelize");
const sequelize = require("../config"); // Adjust the path to your Sequelize configuration

const ContractStatus = sequelize.define(
  "ContractStatus",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Status: {
      type: DataTypes.STRING(20),
    },
  },
  {
    tableName: "ContractStatus",
    timestamps: false,
  }
);

module.exports = ContractStatus;
