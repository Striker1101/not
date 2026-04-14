const express = require("express");
const multer = require("multer");
const path = require("path");
const { User } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

// Configure multer for profile image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `profile-${req.user.uid}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// POST /api/upload/profile — Upload profile image
router.post("/profile", auth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 400, message: "No file uploaded" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const photoURL = `${baseUrl}/uploads/${req.file.filename}`;

    // Update user's photo_url
    await User.update({ photo_url: photoURL }, { where: { id: req.user.id } });

    return res.status(200).json({ status: 200, url: photoURL });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ status: 500, message: "Error uploading image. Please try again later." });
  }
});

// POST /api/upload — General file upload, returns URL
router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 400, message: "No file uploaded" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    return res.status(200).json({ status: 200, url: fileUrl });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Error uploading file." });
  }
});

module.exports = router;
