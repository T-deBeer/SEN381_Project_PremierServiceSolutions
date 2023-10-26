const { DataTypes } = require("sequelize");
const sequelize = require("../config"); // Adjust the path to your Sequelize configuration

const Sku = sequelize.define(
  "SKU",
  {
    SKU: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Description: {
      type: DataTypes.INTEGER,
    },
    HourlyRate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "SKU",
    timestamps: false,
  }
);

module.exports = Sku;
