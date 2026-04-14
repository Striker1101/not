const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MasterWallet = sequelize.define(
  "MasterWallet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    network: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "master_wallets",
    timestamps: false,
  }
);

module.exports = MasterWallet;
