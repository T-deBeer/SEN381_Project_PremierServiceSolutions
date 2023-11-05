const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const ContractDetails = sequelize.define(
  "ContractDetails",
  {
    GUID: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    CommenceDate: {
      type: DataTypes.DATE,
    },
    SignDate: {
      type: DataTypes.DATE,
    },
    ExpiryDate: {
      type: DataTypes.DATE,
    },
    ContractID: {
      type: DataTypes.CHAR(36),
      references: {
        model: "Contract",
        key: "GUID",
      },
    },
  },
  {
    tableName: "ContractDetails",
    timestamps: false,
  }
);

module.exports = ContractDetails;
