require("dotenv").config();
const sequelize = require("./config/database");
const models = require("./models");

async function update() {
  try {
    console.log("🔄 Synchronizing database models...");
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Synchronization failed:", err);
    process.exit(1);
  }
}

update();
