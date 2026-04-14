const express = require("express");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { User, Wallet, UserWallet, Deposit, Withdraw, Nft, NftFile, DepositFile } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ status: 400, message: "Name, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: 400, message: "Email already in use" });
    }

    const uid = uuidv4();

    // Create user
    const user = await User.create({
      uid,
      name,
      email,
      password, // Will be hashed by the beforeCreate hook
      display_name: name,
      balance: 0,
      profit: 0,
    });

    // Generate JWT
    const token = jwt.sign(
      { uid: user.uid, id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      status: 200,
      message: `Welcome ${name}! Account created successfully.`,
      token,
      user: user.toSafeJSON(),
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ status: 500, message: error.message || "Unknown error occurred" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 400, message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ status: 400, message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ status: 400, message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { uid: user.uid, id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      status: 200,
      message: `Welcome ${user.display_name || user.name}`,
      token,
      user: user.toSafeJSON(),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// GET /api/auth/check — verify token and return all user data
router.get("/check", auth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;

    // Fetch all related data
    const wallets = await UserWallet.findAll({
      where: { user_id: userId },
      include: [{ model: Wallet, as: "wallet_details" }],
      order: [["created_at", "DESC"]],
    });
    const deposits = await Deposit.findAll({
      where: { user_id: userId },
      include: [{ model: DepositFile, as: "files" }],
      order: [["created_at", "DESC"]],
    });
    const withdraws = await Withdraw.findAll({ where: { user_id: userId }, order: [["created_at", "DESC"]] });
    const nfts = await Nft.findAll({
      where: { user_id: userId },
      include: [{ model: NftFile, as: "files" }],
      order: [["created_at", "DESC"]],
    });

    // Format deposits to match Firestore structure (regions array with fileUrls)
    const formattedDeposits = deposits.map((d) => {
      const obj = d.toJSON();
      obj.fileUrls = obj.files ? obj.files.map((f) => f.file_url) : [];
      delete obj.files;
      return obj;
    });

    // Format NFTs to match Firestore structure
    const formattedNfts = nfts.map((n) => {
      const obj = n.toJSON();
      obj.fileUrls = obj.files ? obj.files.map((f) => f.file_url) : [];
      obj.id = obj.uuid; // Frontend uses uuid as id
      delete obj.files;
      return obj;
    });

    // Build response matching the Firebase check() structure
    const userData = {
      users: [
        {
          id: user.uid,
          ...user.toSafeJSON(),
          balance: parseFloat(user.balance),
          profit: parseFloat(user.profit),
        },
      ],
      wallets: [{ regions: wallets.map((w) => w.toJSON()) }],
      deposits: [{ regions: formattedDeposits }],
      withdraws: [{ regions: withdraws.map((w) => w.toJSON()) }],
      nfts: [{ regions: formattedNfts }],
    };

    // Build user object matching Firebase auth user shape
    const userObj = {
      uid: user.uid,
      email: user.email,
      displayName: user.display_name || user.name,
      emailVerified: user.email_verified,
      photoURL: user.photo_url,
    };

    return res.status(200).json({
      status: 200,
      message: `User is signed in: ${user.uid}`,
      user: userObj,
      userData,
    });
  } catch (error) {
    console.error("Check error:", error);
    return res.status(400).json({ status: 400, message: "Error getting user data: " + error.message });
  }
});

// POST /api/auth/reset-password (stub)
router.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ status: 400, message: "Email is required" });
    }

    // In a real implementation, send an email with a reset link
    // For now, just return success
    return res.status(200).json({ status: 200, message: "Reset mail sent Successfully" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// POST /api/auth/send-verification (stub)
router.post("/send-verification", async (req, res) => {
  try {
    return res.status(200).json({ status: 200, message: "Verification email sent successfully" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message || "An error occurred" });
  }
});

module.exports = router;
