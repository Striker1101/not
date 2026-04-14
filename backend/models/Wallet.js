const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Wallet = sequelize.define(
  "Wallet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    wallet_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wallet_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    additional_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "wallets",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Wallet;
