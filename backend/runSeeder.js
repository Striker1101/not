require("dotenv").config();
const sequelize = require("./config/database");
const { seedDatabase } = require("./utils/seeder");

async function run() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established.");
    
    // Sync models
    require("./models");
    await sequelize.sync({ alter: true });
    
    await seedDatabase();
    
    console.log("👋 Seeding process finished.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

run();
