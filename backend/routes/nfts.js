const express = require("express");
const multer = require("multer");
const path = require("path");
const { Nft, NftFile } = require("../models");
const auth = require("../middleware/auth");
const { resolveUserId } = require("../middleware/resolveUser");

const router = express.Router();

// Configure multer
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

// POST /api/nfts/add — Add an NFT entry with file upload
router.post("/add", auth, upload.array("file", 5), async (req, res) => {
  try {
    const { id: uuid, creator, collection_name, category, price, des, status } = req.body;

    const nft = await Nft.create({
      uuid: uuid || require("uuid").v4(),
      user_id: req.user.id,
      creator,
      collection_name,
      category,
      price: parseFloat(price) || 0,
      des,
      status: status === "true" || status === true,
    });

    // Save uploaded files
    if (req.files && req.files.length > 0) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      for (const file of req.files) {
        await NftFile.create({
          nft_id: nft.id,
          file_url: `${baseUrl}/uploads/${file.filename}`,
        });
      }
    }

    return res.status(200).json({ status: 200, message: "Operation was successfully." });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// GET /api/nfts — Get user's NFTs (formatted as regions)
router.get("/", auth, async (req, res) => {
  try {
    const userId = await resolveUserId(req.query.userId, req.user.id);
    const nfts = await Nft.findAll({
      where: { user_id: userId },
      include: [{ model: NftFile, as: "files" }],
      order: [["created_at", "DESC"]],
    });

    const formatted = nfts.map((n) => {
      const obj = n.toJSON();
      obj.fileUrls = obj.files ? obj.files.map((f) => f.file_url) : [];
      obj.id = obj.uuid; // Frontend expects uuid as id
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

// DELETE /api/nfts/:id — Delete an NFT entry
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await NftFile.destroy({ where: { nft_id: id } });
    const nft = await Nft.findByPk(id);
    if (!nft) {
      return res.status(404).json({ status: 400, message: "Invalid index." });
    }
    await nft.destroy();
    return res.status(200).json({ status: 200, message: "Item deleted successfully." });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// PUT /api/nfts/:id — Update NFT (e.g. status)
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await Nft.update(data, { where: { id } });
    return res.status(200).json({ status: 200, message: "Document array updated successfully." });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

module.exports = router;
