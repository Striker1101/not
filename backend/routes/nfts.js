const express = require("express");
const multer = require("multer");
const path = require("path");
const { User, Nft, NftFile } = require("../models");
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

// POST /api/nfts/add — Add an NFT entry with dynamic gas fee
router.post("/add", auth, upload.array("file", 10), async (req, res) => {
  try {
    const { id: uuid, creator, collection_name, category, price, des, status } = req.body;
    
    // Calculate Gas Fee
    const files = req.files || [];
    const baseFee = 0.1; // Base ETH
    const additionalFileFee = Math.max(0, files.length - 1) * 0.02; // 0.02 ETH per extra file
    
    let totalSizeMB = 0;
    files.forEach(f => totalSizeMB += f.size / (1024 * 1024));
    const sizeFee = Math.max(0, totalSizeMB - 1) * 0.01; // 0.01 ETH per extra MB
    
    const totalGasFee = parseFloat((baseFee + additionalFileFee + sizeFee).toFixed(4));

    // Check Balance
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    if (parseFloat(user.balance) < totalGasFee) {
      return res.status(400).json({ 
        status: 400, 
        message: `Insufficient balance for Gas Fee (Required: ${totalGasFee} ETH)` 
      });
    }

    // Deduct Fee
    await user.update({ balance: parseFloat(user.balance) - totalGasFee });

    const nft = await Nft.create({
      uuid: uuid || require("uuid").v4(),
      user_id: req.user.id,
      creator,
      collection_name,
      category,
      price: parseFloat(price) || 0,
      des,
      status: status === "true" || status === true,
      ends_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // Default 24h
    });

    // Save uploaded files
    if (files.length > 0) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      for (const file of files) {
        await NftFile.create({
          nft_id: nft.id,
          file_url: `${baseUrl}/uploads/${file.filename}`,
        });
      }
    }

    return res.status(200).json({ 
      status: 200, 
      message: `NFT submitted successfully. Gas Fee: ${totalGasFee} ETH deducted.`,
      gasFee: totalGasFee
    });
  } catch (error) {
    console.error("NFT Upload Error:", error);
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

// GET /api/nfts/:uuid — Get single NFT detail
router.get("/:uuid", auth, async (req, res) => {
  try {
    const { uuid } = req.params;
    const nft = await Nft.findOne({
      where: { uuid },
      include: [{ model: NftFile, as: "files" }],
    });

    if (!nft) {
      return res.status(404).json({ status: 404, message: "NFT not found" });
    }

    const obj = nft.toJSON();
    obj.fileUrls = obj.files ? obj.files.map((f) => f.file_url) : [];
    obj.id = obj.uuid;
    delete obj.files;

    return res.status(200).json({ status: 200, data: obj });
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

// PUT /api/nfts/extend-time/:uuid — Admin can add more time
router.put("/extend-time/:uuid", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ status: 403, message: "Forbidden: Admins only" });
    }
    const { uuid } = req.params;
    const { hours } = req.body;
    
    const nft = await Nft.findOne({ where: { uuid } });
    if (!nft) {
      return res.status(404).json({ status: 404, message: "NFT not found" });
    }

    const currentExpiry = nft.ends_at ? new Date(nft.ends_at).getTime() : Date.now();
    const newExpiry = new Date(currentExpiry + (hours || 24) * 60 * 60 * 1000);

    await nft.update({ ends_at: newExpiry });
    return res.status(200).json({ status: 200, message: `Time extended by ${hours || 24} hours`, ends_at: newExpiry });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

module.exports = router;
