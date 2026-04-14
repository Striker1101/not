const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Withdraw = sequelize.define(
  "Withdraw",
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
    type: {
      type: DataTypes.ENUM("bank", "crypto"),
      allowNull: false,
    },
    // Bank fields
    account_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    swift_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bank_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Crypto fields
    wallet_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wallet_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Common fields
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    withdraw_amount: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    additional_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "withdraws",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Withdraw;
