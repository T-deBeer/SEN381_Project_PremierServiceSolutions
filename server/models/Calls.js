const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");
const Client = require("./Client");
const Attachment = require("./CallAttachment");
const Employee = require("./Employee");

const Call = sequelize.define(
  "Call",
  {
    GUID: {
      type: DataTypes.CHAR,
      length: 36,
      primaryKey: true,
    },
    ClientID: {
      type: DataTypes.CHAR,
      length: 36,
    },
    Attachment: {
      type: DataTypes.INTEGER,
    },
    Start: {
      type: DataTypes.DATE,
    },
    End: {
      type: DataTypes.DATE,
    },
    Type: {
      type: DataTypes.CHAR,
      length: 25,
    },
    CallDescription: {
      type: DataTypes.CHAR,
      length: 100,
    },
  },
  {
    tableName: "Calls",
    timestamps: false,
  }
);

// Define associations
Call.belongsTo(Client, { foreignKey: "ClientID", targetKey: "GUID" });
Call.belongsTo(Attachment, { foreignKey: "Attachment", targetKey: "ID" });

module.exports = Call;
