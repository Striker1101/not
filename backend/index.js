require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2/promise");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files as static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Step 1: Auto-create the database if it doesn't exist
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || "",
    });
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
    );
    await connection.end();
    console.log(`✅ Database '${process.env.DB_NAME}' is ready`);

    // Step 2: Now load Sequelize and models (after DB exists)
    const sequelize = require("./config/database");
    require("./models");

    // Step 3: Register routes (after models are loaded)
    const authRoutes = require("./routes/auth");
    const usersRoutes = require("./routes/users");
    const walletsRoutes = require("./routes/wallets");
    const depositsRoutes = require("./routes/deposits");
    const withdrawsRoutes = require("./routes/withdraws");
    const nftsRoutes = require("./routes/nfts");
    const bidsRoutes = require("./routes/bids");
    const uploadRoutes = require("./routes/upload");
    const adminRoutes = require("./routes/admin");

    app.use("/api/auth", authRoutes);
    app.use("/api/users", usersRoutes);
    app.use("/api/wallets", walletsRoutes);
    app.use("/api/deposits", depositsRoutes);
    app.use("/api/withdraws", withdrawsRoutes);
    app.use("/api/nfts", nftsRoutes);
    app.use("/api/bids", bidsRoutes);
    app.use("/api/upload", uploadRoutes);
    app.use("/api/admin", adminRoutes);

    // Step 4: Sync tables
    await sequelize.sync({ alter: true });
    console.log("✅ Database tables synced successfully");

    // Run comprehensive seeder
    const { seedDatabase } = require("./utils/seeder");
    await seedDatabase();


    // Serve Frontend build in production
    const frontendBuildPath = path.join(__dirname, "../frontend/build");
    app.use(express.static(frontendBuildPath));
    app.get("*", (req, res) => {
      if (!req.path.startsWith("/api")) {
        res.sendFile(path.join(frontendBuildPath, "index.html"));
      }
    });

    // Step 5: Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    console.error(
      "\n💡 Make sure MySQL is installed and running.",
      "\n   On Windows: Install MySQL from https://dev.mysql.com/downloads/installer/",
      "\n   Or install XAMPP/WAMP which includes MySQL.",
      "\n   Then update server/.env with your MySQL credentials.\n"
    );
    process.exit(1);
  }
}

startServer();
