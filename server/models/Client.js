const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");
const ClientType = require("./ClientType");
const ClientAuthentication = require("./ClientAuthentication");

const Client = sequelize.define(
  "Client",
  {
    GUID: {
      type: DataTypes.CHAR,
      length: 36, // Set the length to 36
      primaryKey: true,
    },
    FirstName: {
      type: DataTypes.STRING(50),
    },
    LastName: {
      type: DataTypes.STRING(50),
    },
    Address: {
      type: DataTypes.STRING(255),
    },
    Phone: {
      type: DataTypes.STRING(20),
    },
    Type: {
      type: DataTypes.INTEGER,
      references: {
        model: "ClientType",
        key: "ID",
      },
    },
    Deleted: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Client",
    timestamps: false,
  }
);

Client.belongsTo(ClientType, { foreignKey: "Type" });
Client.hasOne(ClientAuthentication, {
  foreignKey: "ClientID",
});

module.exports = Client;
