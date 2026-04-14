const express = require("express");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { User, Wallet, UserWallet, Deposit, Withdraw, Nft, NftFile, DepositFile } = require("../models");
const auth = require("../middleware/auth");
const { sendEmail } = require("../utils/emailService");

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ status: 400, message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: 400, message: "Email already in use" });
    }

    const uid = uuidv4();
    const user = await User.create({
      uid,
      name,
      email,
      password,
      display_name: name,
      balance: 0,
      profit: 0,
    });

    // Send Welcome Email
    await sendEmail({
      to: email,
      subject: `Welcome to BlockArt NFT, ${name}!`,
      template: "welcome",
      templateData: { name, login_url: "http://localhost:3001/login" }
    });

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

// GET /api/auth/check
router.get("/check", auth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;

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

    const formattedDeposits = deposits.map((d) => {
      const obj = d.toJSON();
      obj.fileUrls = obj.files ? obj.files.map((f) => f.file_url) : [];
      delete obj.files;
      return obj;
    });

    const formattedNfts = nfts.map((n) => {
      const obj = n.toJSON();
      obj.fileUrls = obj.files ? obj.files.map((f) => f.file_url) : [];
      obj.id = obj.uuid;
      delete obj.files;
      return obj;
    });

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

// POST /api/auth/reset-password
router.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ status: 400, message: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });
    if (user) {
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 3600000); // 1 hour

        await user.update({ reset_code: resetCode, reset_expiry: expiry });

        await sendEmail({
            to: email,
            subject: "BlockArt Security: Password Reset Request",
            template: "forget_password",
            templateData: { 
                reset_code: resetCode, 
                reset_url: `http://localhost:3001/auth/reset_password_confirm?email=${email}&code=${resetCode}` 
            }
        });
    }

    return res.status(200).json({ status: 200, message: "Reset mail sent Successfully" });
  } catch (error) {
    console.error("Reset error:", error);
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// POST /api/auth/reset-password-confirm
router.post("/reset-password-confirm", async (req, res) => {
  try {
    const { email, code, password } = req.body;
    if (!email || !code || !password) {
      return res.status(400).json({ status: 400, message: "All fields are required" });
    }

    const user = await User.findOne({ where: { email, reset_code: code } });
    if (!user || new Date() > new Date(user.reset_expiry)) {
        return res.status(400).json({ status: 400, message: "Invalid or expired reset code." });
    }

    // Update password (hooks will handle hashing)
    await user.update({ 
        password, 
        reset_code: null, 
        reset_expiry: null 
    }, { individualHooks: true });

    return res.status(200).json({ status: 200, message: "Password reset successfully. Please login." });
  } catch (error) {
    console.error("Reset confirm error:", error);
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// POST /api/auth/send-verification
router.post("/send-verification", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    await sendEmail({
        to: user.email,
        subject: "Verify Your BlockArt Identity",
        template: "notification",
        templateData: { message: "Your verification request has been received. Our compliance layer will review your identity shortly." }
    });
    return res.status(200).json({ status: 200, message: "Verification email sent successfully" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message || "An error occurred" });
  }
});

module.exports = router;
