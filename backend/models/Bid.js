const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Bid = sequelize.define("Bid", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nft_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false,
    defaultValue: 0,
  },
  collection_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  bidder_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING, // pending, accepted, rejected, paid
    defaultValue: "pending",
  },
}, {
  tableName: "bids",
  underscored: true,
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

module.exports = Bid;
