const { User, Wallet, Admin, Nft, Bid, Deposit, Withdraw, Notification } = require("../models");
const { v4: uuidv4 } = require("uuid");

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // 1. Seed Wallets
    const walletCount = await Wallet.count();
    if (walletCount === 0) {
      await Wallet.bulkCreate([
        { wallet_name: "MetaMask", wallet_network: "Ethereum" },
        { wallet_name: "Trust Wallet", wallet_network: "Multi-Chain" },
        { wallet_name: "Coinbase Wallet", wallet_network: "Ethereum/Polygon" },
        { wallet_name: "Atomic Wallet", wallet_network: "Multi-Chain" },
        { wallet_name: "Phantom", wallet_network: "Solana/Ethereum" },
        { wallet_name: "Binance Chain Wallet", wallet_network: "BSC" },
      ]);
      console.log("✅ Wallets seeded");
    }

    // 2. Seed Admins
    const adminCount = await Admin.count();
    if (adminCount === 0) {
      await Admin.bulkCreate([
        {
          email: "admin@blockartnft.com",
          password: "adminpassword",
          name: "Master Admin",
          role: "super_admin"
        },
        {
          email: "support@blockartnft.com",
          password: "supportpassword",
          name: "Support Lead",
          role: "admin"
        }
      ], { individualHooks: true });
      console.log("✅ Admins seeded");
    }

    // 3. Seed Users
    const userCount = await User.count();
    if (userCount === 0) {
      const users = await User.bulkCreate([
        {
          uid: "system-market",
          name: "Marketplace",
          email: "market@blockartnft.com",
          password: "systempassword",
          balance: 0.00,
          profit: 0.00,
          role: "admin",
          display_name: "System",
          email_verified: true
        },
        {
          uid: uuidv4(),
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          balance: 1500.50,
          profit: 250.00,
          role: "admin",
          display_name: "JohnD",
          email_verified: true

        },
        {
          uid: uuidv4(),
          name: "Jane Smith",
          email: "jane@example.com",
          password: "password123",
          balance: 5000.00,
          profit: 1200.75,
          display_name: "JaneS",
          email_verified: true
        },
        {
          uid: uuidv4(),
          name: "Test User",
          email: "test@example.com",
          password: "password123",
          balance: 0.00,
          profit: 0.00,
          display_name: "Tester",
          email_verified: false
        }
      ], { individualHooks: true });
      console.log("✅ Users seeded");

      // 4. Seed NFTs for John and Jane
      const nfts = await Nft.bulkCreate([
        {
          uuid: uuidv4(),
          user_id: users[0].id,
          creator: "John Doe",
          collection_name: "Abstract Waves",
          category: "Art",
          price: 0.5,
          des: "A beautiful abstract representation of ocean waves.",
          status: true,
          ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        },
        {
          uuid: uuidv4(),
          user_id: users[1].id,
          creator: "Jane Smith",
          collection_name: "Cyber Punk City",
          category: "Collectibles",
          price: 1.2,
          des: "Neon lights and futuristic vibes in a high-res NFT.",
          status: true,
          ends_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
        },
        {
          uuid: uuidv4(),
          user_id: users[0].id,
          creator: "John Doe",
          collection_name: "Pixel Kittens",
          category: "Animals",
          price: 0.1,
          des: "Rare pixelated kitten #001.",
          status: false
        }
      ]);
      console.log("✅ NFTs seeded");

      // 5. Seed Bids
      await Bid.bulkCreate([
        {
          user_id: users[1].id,
          nft_id: nfts[0].id,
          bid_amount: 0.55,
          status: "pending"
        },
        {
          user_id: users[2].id,
          nft_id: nfts[1].id,
          bid_amount: 1.25,
          status: "accepted"
        }
      ]);
      console.log("✅ Bids seeded");

      // 6. Seed Deposits
      await Deposit.bulkCreate([
        {
          user_id: users[0].id,
          amount: 500.00,
          status: true
        },
        {
          user_id: users[1].id,
          amount: 1000.00,
          status: false
        }
      ]);
      console.log("✅ Deposits seeded");

      // 7. Seed Withdrawals
      await Withdraw.bulkCreate([
        {
          user_id: users[1].id,
          type: "crypto",
          wallet_name: "MetaMask",
          wallet_address: "0xAddress123",
          withdraw_amount: 200.00,
          status: true
        }
      ]);
      console.log("✅ Withdrawals seeded");

      // 8. Seed Notifications
      await Notification.bulkCreate([
        {
          user_id: users[0].id,
          title: "Welcome!",
          message: "Thank you for joining Block Art NFT.",
          is_read: true
        },
        {
          user_id: users[1].id,
          title: "Bid Accepted",
          message: "Your bid on Cyber Punk City was accepted!",
          is_read: false
        }
      ]);
      console.log("✅ Notifications seeded");
    }

    console.log("🌱 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

module.exports = { seedDatabase };
