const { DataTypes } = require("sequelize");
const sequelize = require("../config"); // Adjust the path to your Sequelize configuration
const Client = require("./Client"); // Import the Client model
const Employee = require("./Employee"); // Import the Employee model

const ServiceRequest = sequelize.define(
  "ServiceRequest",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Client: {
      type: DataTypes.CHAR(36),
      references: {
        model: "Client",
        key: "GUID",
      },
    },
    Employee: {
      type: DataTypes.CHAR(36),
      references: {
        model: "Employee",
        key: "GUID",
      },
    },
    Priority: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    RequestDate: {
      type: DataTypes.DATE,
      primaryKey: true,
    },
    FulfillmentDate: {
      type: DataTypes.DATE,
      primaryKey: true,
    },
  },
  {
    tableName: "ServiceRequest",
    timestamps: false,
  }
);

MaintenanceJob.belongsTo(Client, {foreignKey: "GUID"});
MaintenanceJob.belongsTo(Employee, { foreignKey: "GUID" });

module.exports = ServiceRequest;
