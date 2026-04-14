const express = require("express");
const { Withdraw } = require("../models");
const auth = require("../middleware/auth");
const { resolveUserId } = require("../middleware/resolveUser");

const router = express.Router();

// POST /api/withdraws/add — Add a withdraw entry
router.post("/add", auth, async (req, res) => {
  try {
    const data = { ...req.body, user_id: req.user.id };
    if (data.withdraw_amount) {
      data.withdraw_amount = parseFloat(data.withdraw_amount) || 0;
    }
    delete data.file;
    await Withdraw.create(data);
    return res.status(200).json({ status: 200, message: "Operation was successfully." });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// GET /api/withdraws — Get user's withdrawals (formatted as regions)
router.get("/", auth, async (req, res) => {
  try {
    const userId = await resolveUserId(req.query.userId, req.user.id);
    const withdraws = await Withdraw.findAll({
      where: { user_id: userId },
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      status: 200,
      data: { regions: withdraws.map((w) => w.toJSON()) },
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// DELETE /api/withdraws/:id — Delete a withdraw entry
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const withdraw = await Withdraw.findByPk(id);
    if (!withdraw) {
      return res.status(404).json({ status: 400, message: "Invalid index." });
    }
    await withdraw.destroy();
    return res.status(200).json({ status: 200, message: "Item deleted successfully." });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// PUT /api/withdraws/:id — Update withdraw (e.g. status)
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await Withdraw.update(data, { where: { id } });
    return res.status(200).json({ status: 200, message: "Document array updated successfully." });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

module.exports = router;
