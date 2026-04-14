const express = require("express");
const crypto = require("crypto");
const { Bid, User, Nft, NftFile } = require("../models");
const auth = require("../middleware/auth");
const { resolveUserId } = require("../middleware/resolveUser");

const router = express.Router();

// GET /api/bids — Get user's bids
router.get("/", auth, async (req, res) => {
  try {
    const userId = await resolveUserId(req.query.userId, req.user.id);
    const bids = await Bid.findAll({
      where: { user_id: userId },
      include: [
        { 
          model: Nft, 
          as: "nft_details",
          include: [{ model: NftFile, as: "files" }]
        }
      ],
      order: [["created_at", "DESC"]],
    });
    return res.status(200).json({ status: 200, data: bids });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// POST /api/bids/place — Place a bid
router.post("/place", auth, async (req, res) => {
  try {
    const { nft_id, amount, collection_name, creator, price, image_url } = req.body;

    if (!nft_id || !amount) {
      return res.status(400).json({ status: 400, message: "NFT and amount are required." });
    }

    // Check if NFT exists in DB
    let nft = await Nft.findByPk(nft_id);
    
    // If it's a mock NFT (not in DB), auto-create a placeholder
    if (!nft) {
       nft = await Nft.create({
          id: nft_id, // Force the ID to match the mock ID
          uuid: crypto.randomUUID(),
          user_id: req.user.id,
          collection_name: collection_name || "Nexus Asset",
          creator: creator || "System",
          price: price || 0,
          category: "MARKETPLACE",
          status: true
       });
       
       // Create a dummy file entry so it doesn't crash on retrieval
       await NftFile.create({
          nft_id: nft.id,
          file_url: image_url || "https://via.placeholder.com/400"
       });
    }

    const bid = await Bid.create({
      user_id: req.user.id,
      nft_id,
      amount: parseFloat(amount),
      collection_name: collection_name || "N/A",
      image_url: image_url || "",
      status: "pending",
    });

    return res.status(200).json({ status: 200, message: "Bid placed successfully.", data: bid });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// DELETE /api/bids/:id — Cancel a pending bid
router.delete("/:id", auth, async (req, res) => {
  try {
    const bid = await Bid.findOne({
       where: { id: req.params.id, user_id: req.user.id, status: "pending" }
    });

    if (!bid) {
       return res.status(404).json({ status: 404, message: "Pending bid not found or already accepted." });
    }

    await bid.destroy();
    return res.status(200).json({ status: 200, message: "Bid cancelled successfully." });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// POST /api/bids/pay/:id — Pay for an accepted bid
router.post("/pay/:id", auth, async (req, res) => {
  try {
    const bid = await Bid.findOne({
      where: { id: req.params.id, user_id: req.user.id, status: "accepted" },
    });

    if (!bid) {
      return res.status(404).json({ status: 404, message: "Accepted bid not found." });
    }

    const user = await User.findByPk(req.user.id);
    if (parseFloat(user.balance) < parseFloat(bid.amount)) {
      return res.status(400).json({ status: 400, message: "Insufficient balance to pay for this NFT." });
    }

    // Deduct balance
    await user.update({ balance: parseFloat(user.balance) - parseFloat(bid.amount) });
    
    // Update bid status
    await bid.update({ status: "paid" });

    // Optionally: Transfer NFT ownership logic here if needed
    // const nft = await Nft.findByPk(bid.nft_id);
    // await nft.update({ user_id: user.id });

    return res.status(200).json({ status: 200, message: "Payment successful. The NFT is now yours!" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// ADMIN ROUTES (Ideally should be in an admin controller)
// PUT /api/bids/admin/status/:id — Update bid status (Admin only)
router.put("/admin/status/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
       return res.status(403).json({ status: 403, message: "Unauthorized. Admin only." });
    }
    const { status } = req.body; // accepted, rejected
    const bid = await Bid.findByPk(req.params.id);
    if (!bid) return res.status(404).json({ status: 404, message: "Bid not found." });

    await bid.update({ status });
    return res.status(200).json({ status: 200, message: `Bid ${status} successfully.` });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

module.exports = router;
