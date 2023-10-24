const { DataTypes } = require("sequelize");
const sequelize = require("../config");
const ContractStatus = require("./ContractStatus");
const ContractType = require("./ContractType");
const Client = require("./Client");

const Contract = sequelize.define(
  "Contract",
  {
    GUID: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    ClientID: {
      type: DataTypes.CHAR(36),
    },
    ContractBlob: {
      type: DataTypes.BLOB,
    },
    Status: {
      type: DataTypes.INTEGER,
    },
    Type: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Contract",
    timestamps: false,
  }
);

// Define the associations
Contract.belongsTo(ContractStatus, { foreignKey: "Status" });
Contract.belongsTo(ContractType, { foreignKey: "Type" });
Contract.belongsTo(Client, { foreignKey: "ClientID" });

module.exports = Contract;
