require("dotenv").config();
const mysql = require("mysql2/promise");

async function dropDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || "",
    });
    console.log("Dropping database...");
    await connection.query(`DROP DATABASE IF EXISTS \`${process.env.DB_NAME}\`;`);
    console.log("Database dropped successfully.");
    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error("Error dropping database:", err);
    process.exit(1);
  }
}

dropDatabase();
