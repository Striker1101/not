const express = require("express");
const { User, Notification } = require("../models");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { sendEmail } = require("../utils/emailService");

const router = express.Router();

// GET /api/users — Admin: get all users (ordered by updated_at DESC)
router.get("/", auth, admin, async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["updated_at", "DESC"]],
    });

    const safeUsers = users.map((u) => {
      const data = u.toSafeJSON();
      data.balance = parseFloat(data.balance);
      data.profit = parseFloat(data.profit);
      return data;
    });

    return res.status(200).json({ status: 200, data: safeUsers });
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(400).json({ status: 400, data: error.message });
  }
});

// PUT /api/users/update — Update own user document
router.put("/update", auth, async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ status: 404, message: "User not found." });

    const isPasswordUpdate = !!data.password;
    
    // Update user with individualHooks: true to trigger beforeUpdate
    await user.update(data, { individualHooks: true });

    // 1. Send Account Notification
    await Notification.create({
      user_id: user.id,
      title: "Profile Updated",
      message: isPasswordUpdate 
        ? "Your profile and vault password have been successfully updated. Stay secure!"
        : "Your profile metadata has been successfully updated.",
      type: isPasswordUpdate ? "security" : "info"
    });

    // 2. Real Email Confirmation
    await sendEmail({
      to: user.email,
      subject: isPasswordUpdate ? "Security Alert: Password Changed" : "Profile Updated",
      template: "notification",
      templateData: { 
        message: isPasswordUpdate 
          ? `Hello ${user.name}, your account vault has been successfully re-secured with a new password. If you did not authorize this change, please contact our relay support immediately.`
          : `Hello ${user.name}, your profile metadata has been successfully synchronized with the BlockArt network.`
      }
    });

    return res.status(200).json({ status: 200, message: "Profile successfully synchronized." });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(400).json({ status: 400, message: error.message });
  }
});

// PUT /api/users/:uid/update — Admin: update a specific user's balance/profit
router.put("/:uid/update", auth, admin, async (req, res) => {
  try {
    const { uid } = req.params;
    const data = req.body;

    const user = await User.findOne({ where: { uid } });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    await User.update(data, { where: { uid } });
    return res.status(200).json({ status: 200, message: "Document updated successfully." });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

module.exports = router;
