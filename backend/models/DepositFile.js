const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DepositFile = sequelize.define(
  "DepositFile",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    deposit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "deposits",
        key: "id",
      },
    },
    file_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "deposit_files",
    timestamps: false,
  }
);

module.exports = DepositFile;
