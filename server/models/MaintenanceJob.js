const { DataTypes } = require("sequelize");
const sequelize = require("../config"); // Adjust the path to your Sequelize configuration
const ContractType = require("./ContractType"); // Import the ContractType model
const Contract = require("./Contract"); // Import the Contract model

const MaintenanceJob = sequelize.define(
  "MaintenanceJob",
  {
    GUID: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    Type: {
      type: DataTypes.INTEGER,
      references: {
        model: "ContractType",
        key: "ID",
      },
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
    tableName: "MaintenanceJob",
    timestamps: false,
  }
);

MaintenanceJob.belongsTo(Contract, {
  foreignKey: "ContractID",
});
MaintenanceJob.belongsTo(ContractType, { foreignKey: "Type" });

module.exports = MaintenanceJob;
