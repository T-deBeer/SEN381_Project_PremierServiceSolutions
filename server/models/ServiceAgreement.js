const { DataTypes } = require("sequelize");
const sequelize = require("../config");
const Contract = require("./Contract");

const ServiceAgreement = sequelize.define(
  "ServiceAgreement",
  {
    GUID: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    SLABlob: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ContractID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
  },
  {
    tableName: "ServiceAgreement",
    timestamps: false,
  }
);

ServiceAgreement.belongsTo(Contract, { foreignKey: "ContractID" });

module.exports = ServiceAgreement;
