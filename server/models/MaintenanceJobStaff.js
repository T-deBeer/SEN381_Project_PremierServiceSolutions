const { DataTypes } = require("sequelize");
const sequelize = require("../config");
const Employee = require("./Employee");
const MaintenanceJob = require("./MaintenanceJob");

const MaintenanceJobStaff = sequelize.define(
  "MaintenanceJobStaff",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Employee: {
      type: DataTypes.CHAR(36),
      references: {
        model: Employee,
        key: "GUID",
      },
    },
    Job: {
      type: DataTypes.CHAR(36),
      references: {
        model: MaintenanceJob,
        key: "GUID", 
      },
    },
  },
  {
    tableName: "MaintenanceJobStaff",
    timestamps: false, 
  }
);


MaintenanceJobStaff.belongsTo(Employee, { foreignKey: "Employee" });
MaintenanceJobStaff.belongsTo(MaintenanceJob, { foreignKey: "Job" });

module.exports = MaintenanceJobStaff;
