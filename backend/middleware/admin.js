const admin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ status: 403, message: "Admin access required" });
  }
  next();
};

module.exports = admin;
