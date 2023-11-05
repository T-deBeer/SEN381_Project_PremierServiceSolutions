const { DataTypes } = require("sequelize");
const sequelize = require("../config");
const ContractStatus = require("./ContractStatus");
const ContractType = require("./ContractType");
const Client = require("./Client");
const ContractDetails = require("./ContractDetails");

const Contract = sequelize.define(
  "Contract",
  {
    GUID: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    ClientID: {
      type: DataTypes.CHAR(36),
      references: {
        model: "Client",
        key: "GUID",
      },
    },
    ContractBlob: {
      type: DataTypes.STRING,
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
Contract.hasOne(ContractDetails, { foreignKey: "ContractID" });

module.exports = Contract;
