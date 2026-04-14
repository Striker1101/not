const express = require("express");
const { User, Deposit, Withdraw, Nft, NftFile, DepositFile, Bid } = require("../models");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// GET /api/admin/stats — Get system overview
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const userCount = await User.count();
    const nftCount = await Nft.count();
    const totalDeposits = await Deposit.sum("amount", { where: { status: "approved" } }) || 0;
    const pendingWithdrawals = await Withdraw.count({ where: { status: "pending" } });

    return res.json({
      status: 200,
      data: { userCount, nftCount, totalDeposits, pendingWithdrawals }
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// GET /api/admin/users — Manage users
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.findAll({ order: [["created_at", "DESC"]] });
    res.json({ status: 200, data: users });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// GET /api/admin/deposits — Manage deposits
router.get("/deposits", adminAuth, async (req, res) => {
  try {
    const deposits = await Deposit.findAll({
      include: [{ model: User, attributes: ["name", "email"] }],
      order: [["created_at", "DESC"]]
    });
    res.json({ status: 200, data: deposits });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// PUT /api/admin/deposits/:id — Verify deposit
router.put("/deposits/:id", adminAuth, async (req, res) => {
  try {
    const { status } = req.body; // approved, rejected
    const deposit = await Deposit.findByPk(req.params.id);
    if (!deposit) return res.status(404).json({ message: "Deposit not found" });

    if (status === "approved" && deposit.status !== "approved") {
        const user = await User.findByPk(deposit.user_id);
        await user.increment("balance", { by: deposit.amount });
    }

    await deposit.update({ status });
    res.json({ status: 200, message: `Deposit ${status}` });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// GET /api/admin/withdrawals — Manage withdrawals
router.get("/withdrawals", adminAuth, async (req, res) => {
  try {
    const withdrawals = await Withdraw.findAll({
      include: [{ model: User, attributes: ["name", "email"] }],
      order: [["created_at", "DESC"]]
    });
    res.json({ status: 200, data: withdrawals });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// PUT /api/admin/withdrawals/:id
router.put("/withdrawals/:id", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const withdrawal = await Withdraw.findByPk(req.params.id);
    if (!withdrawal) return res.status(404).json({ message: "Withdrawal not found" });

    await withdrawal.update({ status });
    res.json({ status: 200, message: `Withdrawal ${status}` });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

module.exports = router;
