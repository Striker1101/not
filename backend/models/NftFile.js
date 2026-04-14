const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const NftFile = sequelize.define(
  "NftFile",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nft_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "nfts",
        key: "id",
      },
    },
    file_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "nft_files",
    timestamps: false,
  }
);

module.exports = NftFile;
