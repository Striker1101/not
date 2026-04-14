const express = require("express");
const { Wallet } = require("../models");
const auth = require("../middleware/auth");
const { resolveUserId } = require("../middleware/resolveUser");

const router = express.Router();

// POST /api/wallets/add — Add a wallet entry
router.post("/add", auth, async (req, res) => {
  try {
    const data = { ...req.body, user_id: req.user.id };
    delete data.file; // Remove any file field if present
    await Wallet.create(data);
    return res.status(200).json({ status: 200, message: "Operation was successfully." });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// GET /api/wallets — Get user's wallets (formatted as regions)
router.get("/", auth, async (req, res) => {
  try {
    const userId = await resolveUserId(req.query.userId, req.user.id);
    const wallets = await Wallet.findAll({
      where: { user_id: userId },
      order: [["created_at", "DESC"]],
    });
    return res.status(200).json({
      status: 200,
      data: { regions: wallets.map((w) => w.toJSON()) },
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// DELETE /api/wallets/:id — Delete a wallet entry
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const wallet = await Wallet.findByPk(id);
    if (!wallet) {
      return res.status(404).json({ status: 400, message: "Invalid index." });
    }
    await wallet.destroy();
    return res.status(200).json({ status: 200, message: "Item deleted successfully." });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

module.exports = router;
