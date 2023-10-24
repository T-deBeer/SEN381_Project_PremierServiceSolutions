const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

// Define the Employee model
const Employee = sequelize.define(
  "Employee",
  {
    GUID: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    FirstName: {
      type: DataTypes.STRING(50),
    },
    LastName: {
      type: DataTypes.STRING(50),
    },
    Email: {
      type: DataTypes.STRING(100),
    },
    Phone: {
      type: DataTypes.STRING(20),
    },
    HireDate: {
      type: DataTypes.DATE,
    },
    JobTitle: {
      type: DataTypes.STRING(50),
    },
    Password: {
      type: DataTypes.STRING(72),
    },
  },
  {
    tableName: "Employee",
    timestamps: false,
  }
);

module.exports = Employee;
