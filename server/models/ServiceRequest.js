const { DataTypes } = require("sequelize");
const sequelize = require("../config"); // Adjust the path to your Sequelize configuration
const Client = require("./Client"); // Import the Client model
const Employee = require("./Employee"); // Import the Employee model
const SKU = require("./SKU"); // Import the SKU model

const ServiceRequest = sequelize.define(
  "ServiceRequest",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    ClientID: {
      type: DataTypes.CHAR(36),
      references: {
        model: "Client",
        key: "GUID",
      },
    },
    EmployeeID: {
      type: DataTypes.CHAR(36),
      references: {
        model: "Employee",
        key: "GUID",
      },
    },
    Priority: {
      type: DataTypes.INTEGER,
    },
    RequestDate: {
      type: DataTypes.DATE,
    },
    FulfillmentDate: {
      type: DataTypes.DATE,
    },
    Active: {
      type: DataTypes.INTEGER
    },
    Sku: {
      type: DataTypes.STRING,
      references: {
        model: "Sku",
        key: "Sku",
      },
    }
    
  },
  {
    tableName: "ServiceRequest",
    timestamps: false,
  }
);

ServiceRequest.belongsTo(Client, {foreignKey: "ClientID"});
ServiceRequest.belongsTo(Employee, { foreignKey: "EmployeeID" });
ServiceRequest.belongsTo(SKU, { foreignKey: "Sku" });

module.exports = ServiceRequest;
