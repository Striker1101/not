const User = require("./User");
const Wallet = require("./Wallet");
const UserWallet = require("./UserWallet");
const Deposit = require("./Deposit");
const DepositFile = require("./DepositFile");
const Withdraw = require("./Withdraw");
const Nft = require("./Nft");
const NftFile = require("./NftFile");

// Associations
User.hasMany(UserWallet, { foreignKey: "user_id", as: "user_wallets" });
UserWallet.belongsTo(User, { foreignKey: "user_id" });

Wallet.hasMany(UserWallet, { foreignKey: "wallet_id", as: "user_submissions" });
UserWallet.belongsTo(Wallet, { foreignKey: "wallet_id", as: "wallet_details" });

User.hasMany(Deposit, { foreignKey: "user_id", as: "deposits" });
Deposit.belongsTo(User, { foreignKey: "user_id" });

Deposit.hasMany(DepositFile, { foreignKey: "deposit_id", as: "files" });
DepositFile.belongsTo(Deposit, { foreignKey: "deposit_id" });

User.hasMany(Withdraw, { foreignKey: "user_id", as: "withdraws" });
Withdraw.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Nft, { foreignKey: "user_id", as: "nfts" });
Nft.belongsTo(User, { foreignKey: "user_id" });

Nft.hasMany(NftFile, { foreignKey: "nft_id", as: "files" });
NftFile.belongsTo(Nft, { foreignKey: "nft_id" });

module.exports = {
  User,
  Wallet,
  UserWallet,
  Deposit,
  DepositFile,
  Withdraw,
  Nft,
  NftFile,
};
