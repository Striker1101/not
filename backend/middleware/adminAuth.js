const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ status: 401, message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ status: 403, message: "Access denied. Master access required." });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ status: 401, message: "Token is not valid" });
  }
};
