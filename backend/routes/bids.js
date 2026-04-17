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
       // Find a system user (admin or first user) to own the market NFT
       const systemUser = await User.findOne({ where: { role: "admin" } }) || await User.findOne();
       
       if (!systemUser) {
         return res.status(400).json({ status: 400, message: "No system user found to own market assets." });
       }

       nft = await Nft.create({
          id: nft_id, // Force the ID to match the mock ID
          uuid: crypto.randomUUID(),
          user_id: systemUser.id, 
          collection_name: collection_name || "Nexus Asset",
          creator: creator || "System",
          price: price || 0,
          category: "MARKETPLACE",
          status: true,
          ends_at: new Date(Date.now() + 24 * 60 * 60 * 1000)
       });

       
       // Create a dummy file entry so it doesn't crash on retrieval
       await NftFile.create({
          nft_id: nft.id,
          file_url: image_url || "https://via.placeholder.com/400"
       });
    }

    // BLOCK OWNERS FROM BIDDING ON THEIR OWN NFT
    if (nft.user_id === req.user.id) {
       return res.status(400).json({ status: 400, message: "You cannot bid on your own project." });
    }

    const bid = await Bid.create({
      user_id: req.user.id,
      nft_id,
      amount: parseFloat(amount),
      collection_name: collection_name || "N/A",
      image_url: image_url || "",
      status: "pending",
    });

    // NOTIFY OWNER
    const { sendEmail } = require("../utils/emailService");
    const owner = await User.findByPk(nft.user_id);
    if (owner && owner.email) {
        await sendEmail({
            to: owner.email,
            subject: `New Offer Received: ${nft.collection_name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eef2ff; border-radius: 16px; overflow: hidden;">
                    <div style="background: #2563eb; padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">New Bid Registered</h1>
                    </div>
                    <div style="padding: 40px; color: #1e293b; line-height: 1.6;">
                        <p>Great news! A new offer has been placed on your asset <strong>${nft.collection_name}</strong>.</p>
                        <div style="background: #f1f5f9; padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center;">
                            <span style="display: block; font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em;">Current Bid</span>
                            <span style="font-size: 32px; font-weight: 900; color: #0f172a;">${amount} ETH</span>
                        </div>
                        <p>Log in to your dashboard to review and accept this offer.</p>
                    </div>
                </div>
            `
        });
    }

    return res.status(200).json({ status: 200, message: "Bid placed successfully.", data: bid });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// GET /api/bids/nft/:nftId — Get all bids for a specific NFT (for the owner)
router.get("/nft/:nftId", auth, async (req, res) => {
  try {
    const { nftId } = req.params;
    const nft = await Nft.findByPk(nftId);
    if (!nft) return res.status(404).json({ status: 404, message: "NFT not found" });

    // Show all bids to the owner, only pending/accepted ones? Or all.
    const bids = await Bid.findAll({
      where: { nft_id: nftId },
      include: [{ model: User, as: "User", attributes: ["name", "email", "uid"] }],
      order: [["amount", "DESC"]]
    });

    return res.status(200).json({ status: 200, data: bids });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// POST /api/bids/accept/:id — Owner accepts a bid
router.post("/accept/:id", auth, async (req, res) => {
  try {
    const bid = await Bid.findByPk(req.params.id);
    if (!bid) return res.status(404).json({ status: 404, message: "Bid not found" });

    const nft = await Nft.findByPk(bid.nft_id);
    if (nft.user_id !== req.user.id) {
       return res.status(403).json({ status: 403, message: "Only the owner can accept a bid." });
    }

    // Check if any bid is already accepted for this NFT
    const alreadyAccepted = await Bid.findOne({ where: { nft_id: nft.id, status: ["accepted", "paid"] } });
    if (alreadyAccepted) {
       return res.status(400).json({ status: 400, message: "A bid has already been accepted for this NFT." });
    }

    await bid.update({ status: "accepted" });
    
    // Optionally reject all other pending bids
    await Bid.update({ status: "rejected" }, { 
        where: { 
            nft_id: nft.id, 
            status: "pending",
            id: { [require("sequelize").Op.ne]: bid.id }
        } 
    });

    return res.status(200).json({ status: 200, message: "Bid accepted successfully." });
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
