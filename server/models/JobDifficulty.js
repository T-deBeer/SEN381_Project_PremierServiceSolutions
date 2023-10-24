const { DataTypes } = require("sequelize");
const sequelize = require("../config"); // Adjust the path to your Sequelize configuration
const MaintenanceJob = require("./MaintenanceJob");

const JobDifficulty = sequelize.define(
  "JobDifficulty",
  {
    MaintenanceJobGUID: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      references: {
        model: MaintenanceJob,
        key: "GUID",
      },
    },
    Difficulty: {
      type: DataTypes.STRING(50),
    },
  },
  {
    tableName: "JobDifficulty",
    timestamps: false,
  }
);

JobDifficulty.belongsTo(MaintenanceJob, {
  foreignKey: "MaintenanceJobGUID",
  targetKey: "GUID",
});

module.exports = JobDifficulty;
