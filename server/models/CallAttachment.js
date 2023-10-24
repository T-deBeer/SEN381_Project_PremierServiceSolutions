const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

const CallAttachment = sequelize.define(
  "CallAttachment",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Attachment: {
      type: DataTypes.STRING(30),
    },
  },
  {
    tableName: "CallAttachment",
    timestamps: false,
  }
);

module.exports = CallAttachment;
