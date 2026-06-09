const express = require("express");
const multer = require("multer");
const path = require("path");
const { Deposit, DepositFile } = require("../models");
const auth = require("../middleware/auth");
const { resolveUserId } = require("../middleware/resolveUser");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// POST /api/deposits/add — Add a deposit entry with optional file upload
router.post("/add", auth, upload.array("file", 5), async (req, res) => {
  try {
    const { wallet, amount, status } = req.body;

    const deposit = await Deposit.create({
      user_id: req.user.id,
      wallet,
      amount: parseFloat(amount) || 0,
      status: status === "true" || status === true,
    });

    // Save uploaded files
    if (req.files && req.files.length > 0) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      for (const file of req.files) {
        await DepositFile.create({
          deposit_id: deposit.id,
          file_url: `${baseUrl}/uploads/${file.filename}`,
        });
      }
    }

    return res.status(200).json({ status: 200, message: "the operation was successful and that verified within an hour" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// GET /api/deposits — Get user's deposits (formatted as regions)
router.get("/", auth, async (req, res) => {
  try {
    const userId = await resolveUserId(req.query.userId, req.user.id);
    const deposits = await Deposit.findAll({
      where: { user_id: userId },
      include: [{ model: DepositFile, as: "files" }],
      order: [["created_at", "DESC"]],
    });

    const formatted = deposits.map((d) => {
      const obj = d.toJSON();
      obj.fileUrls = obj.files ? obj.files.map((f) => f.file_url) : [];
      delete obj.files;
      return obj;
    });

    return res.status(200).json({
      status: 200,
      data: { regions: formatted },
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// DELETE /api/deposits/:id — Delete a deposit entry
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await DepositFile.destroy({ where: { deposit_id: id } });
    const deposit = await Deposit.findByPk(id);
    if (!deposit) {
      return res.status(404).json({ status: 400, message: "Invalid index." });
    }
    await deposit.destroy();
    return res.status(200).json({ status: 200, message: "Item deleted successfully." });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// PUT /api/deposits/:id — Update deposit (e.g. status)
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await Deposit.update(data, { where: { id } });
    return res.status(200).json({ status: 200, message: "Document array updated successfully." });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

module.exports = router;
