const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserWallet = sequelize.define(
  "UserWallet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wallet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recovery_phrase: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "user_wallets",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = UserWallet;
