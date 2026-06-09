const express = require("express");
const { User, Deposit, Withdraw, Nft, NftFile, DepositFile, Bid, Notification, UserWallet, Wallet } = require("../models");
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

    if (status === true && deposit.status !== true) {
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

// GET /api/admin/users/:userId/nfts — Get user's NFTs
router.get("/users/:userId/nfts", adminAuth, async (req, res) => {
  try {
    const nfts = await Nft.findAll({
      where: { user_id: req.params.userId },
      include: [
        { model: NftFile, as: "files" },
        { model: Bid, as: "bids" }
      ],
      order: [["created_at", "DESC"]]
    });
    res.json({ status: 200, data: nfts });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// GET /api/admin/nfts/:nftId/bids — See bids on a user NFT
router.get("/nfts/:nftId/bids", adminAuth, async (req, res) => {
  try {
    const bids = await Bid.findAll({
      where: { nft_id: req.params.nftId },
      include: [{ model: User, attributes: ["name", "email"] }],
      order: [["amount", "DESC"]]
    });
    res.json({ status: 200, data: bids });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// POST /api/admin/accept-bid-behalf/:bidId — Admin accepts on behalf of owner
router.post("/accept-bid-behalf/:bidId", adminAuth, async (req, res) => {
  try {
    const bid = await Bid.findByPk(req.params.bidId, {
      include: [
        { model: Nft, as: "nft_details", include: [{ model: User }] },
        { model: User }
      ]
    });
    
    if (!bid) return res.status(404).json({ message: "Bid not found" });
    if (bid.status !== "pending") return res.status(400).json({ message: "Bid is not pending" });

    // Update the accepted bid
    await bid.update({ status: "accepted" });

    // Reject others for this NFT
    await Bid.update(
        { status: "rejected" },
        { where: { nft_id: bid.nft_id, id: { [require("sequelize").Op.ne]: bid.id } } }
    );

    // NOTIFY OWNER (Behalf of email)
    const { sendEmail } = require("../utils/emailService");
    const owner = bid.nft_details.User;
    
    await sendEmail({
        to: owner.email,
        subject: `[Protocol Intervention] Bid Accepted on ${bid.nft_details.collection_name}`,
        html: `
            <h2 style="color: #2563eb;">Market Intervention Report</h2>
            <p>Hello ${owner.name},</p>
            <p>The system administration has authorized and accepted a bid for your asset <strong>${bid.nft_details.collection_name}</strong>.</p>
            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                <p style="margin: 0;"><strong>Accepted Offer:</strong> ${bid.amount} ETH</p>
                <p style="margin: 5px 0 0;"><strong>Status:</strong> Settlement in Progress</p>
            </div>
            <p>This action was performed by the compliance layer to facilitate marketplace liquidity.</p>
        `
    });

    res.json({ status: 200, message: "Bid accepted on behalf of owner. Notification dispatched." });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});
// PUT /api/admin/users/:userId/finances — Manual wealth adjustment
router.put("/users/:userId/finances", adminAuth, async (req, res) => {
  try {
    const { balance, profit } = req.body;
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({ 
        balance: parseFloat(balance || user.balance),
        profit: parseFloat(profit || user.profit) 
    });
    
    res.json({ status: 200, message: "Investor finances reconciled successfully.", data: user });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});
// PUT /api/admin/nfts/:id — Universal metadata/status update
router.put("/nfts/:id", adminAuth, async (req, res) => {
  try {
    const { status, price, collection_name, ends_at } = req.body;
    const nft = await Nft.findByPk(req.params.id);
    if (!nft) return res.status(404).json({ message: "Asset not found" });

    await nft.update({
        status: status !== undefined ? status : nft.status,
        price: price !== undefined ? parseFloat(price) : nft.price,
        collection_name: collection_name || nft.collection_name,
        ends_at: ends_at || nft.ends_at
    });

    res.json({ status: 200, message: "Asset parameters synchronized.", data: nft });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// POST /api/admin/nfts/:id/bid — Manually inject a protocol/system bid
router.post("/nfts/:id/bid", adminAuth, async (req, res) => {
  try {
    const { amount, bidder_name } = req.body;
    const { id: nid } = req.params;
    let nft;
    if (nid.length > 10) {
        nft = await Nft.findOne({ where: { uuid: nid } });
    } else {
        nft = await Nft.findByPk(nid);
    }
    
    if (!nft) return res.status(404).json({ message: "Asset not found" });

    // Admin override: reset any previously accepted/paid bids to 'closed' 
    // so the new injected bid can be accepted fresh
    await Bid.update(
        { status: "closed" }, 
        { where: { nft_id: nft.id, status: ["accepted", "paid"] } }
    );

    // Find the marketplace user to assign as the technical bidder
    const systemUser = await User.findOne({ where: { email: "market@blockartnft.com" } }) || 
                      await User.findOne({ where: { role: "admin" } }) || 
                      await User.findOne();

    const newBid = await Bid.create({
        nft_id: nft.id,
        user_id: systemUser?.id || 1, 
        amount: parseFloat(amount),
        bidder_name: bidder_name || "Institutional Agent",
        collection_name: nft.collection_name,
        image_url: "",
        status: "pending"
    });

    // Create In-App Notification
    await Notification.create({
        user_id: nft.user_id,
        title: "Verified Offer Received",
        message: `An institutional liquidity provider has placed a verified bid of ${amount} ETH on your asset: ${nft.collection_name}.`,
        type: "promo"
    });

    // Notify Owner via Email
    const { sendEmail } = require("../utils/emailService");
    const owner = await User.findByPk(nft.user_id);
    if (owner) {
        await sendEmail({
            to: owner.email,
            subject: `Verified Bid Incoming: ${nft.collection_name}`,
            html: `
                <h2 style="color: #2563eb;">Market Intelligence Alert</h2>
                <p>Hello ${owner.name},</p>
                <p>A new verified offer of <strong>${amount} ETH</strong> has been registered for your asset <strong>${nft.collection_name}</strong> by <strong>${bidder_name || "Institutional Agent"}</strong>.</p>
                <p>Source: Institutional Liquidity Hub</p>
                <p>Review the bid in your dashboard to proceed with settlement.</p>
            `
        });
    }

    res.json({ status: 200, message: "Manual bid injected. Notification dispatched.", data: newBid });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// GET /api/admin/users/:userId/wallets — Get user's linked wallets (including soft-deleted)
router.get("/users/:userId/wallets", adminAuth, async (req, res) => {
  try {
    const wallets = await UserWallet.findAll({
      where: { user_id: req.params.userId },
      paranoid: false,
      include: [{ model: Wallet, as: "wallet_details" }],
      order: [["created_at", "DESC"]],
    });
    res.json({ status: 200, data: wallets });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// DELETE /api/admin/user-wallets/:id — Hard delete a user's wallet
router.delete("/user-wallets/:id", adminAuth, async (req, res) => {
  try {
    const wallet = await UserWallet.findByPk(req.params.id, { paranoid: false });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    await wallet.destroy({ force: true });
    res.json({ status: 200, message: "Wallet permanently deleted" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// PUT /api/admin/user-wallets/:id — Update wallet status
router.put("/user-wallets/:id", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const wallet = await UserWallet.findByPk(req.params.id, { paranoid: false });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    await wallet.update({ status });
    res.json({ status: 200, message: `Wallet status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// GET /api/admin/users/:userId/deposits — Get user's deposits
router.get("/users/:userId/deposits", adminAuth, async (req, res) => {
  try {
    const deposits = await Deposit.findAll({
      where: { user_id: req.params.userId },
      order: [["created_at", "DESC"]],
    });
    res.json({ status: 200, data: deposits });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// GET /api/admin/users/:userId/withdrawals — Get user's withdrawals
router.get("/users/:userId/withdrawals", adminAuth, async (req, res) => {
  try {
    const withdrawals = await Withdraw.findAll({
      where: { user_id: req.params.userId },
      order: [["created_at", "DESC"]],
    });
    res.json({ status: 200, data: withdrawals });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

module.exports = router;
