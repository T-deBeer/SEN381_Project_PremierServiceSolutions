const { DataTypes } = require("sequelize");
const sequelize = require("../config"); // Adjust the path to your Sequelize configuration
const ContractType = require("./ContractType"); // Import the ContractType model
const Contract = require("./Contract"); // Import the Contract model
const Client = require("./Client"); // Import the Contract model
const JobDifficulty = require("./JobDifficulty");

const MaintenanceJob = sequelize.define(
  "MaintenanceJob",
  {
    GUID: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    ContractID: {
      type: DataTypes.CHAR(36),
      references: {
        model: "Contract",
        key: "GUID",
      },
    },
    Description: {
      type: DataTypes.STRING,
    },
    DifficultyRating: {
      type: DataTypes.INTEGER,
    },
    MaintenanceType: {
      type: DataTypes.CHAR,
      length: 20,
    },
    ClientID: {
      type: DataTypes.CHAR(36),
      references: {
        model: "Client",
        key: "GUID",
      },
    },
  },
  {
    tableName: "MaintenanceJob",
    timestamps: false,
  }
);

MaintenanceJob.belongsTo(Contract, {
  foreignKey: "ContractID",
});
MaintenanceJob.belongsTo(Client, {
  foreignKey: "ClientID",
});

module.exports = MaintenanceJob;
