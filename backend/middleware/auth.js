const jwt = require("jsonwebtoken");
const { User } = require("../models");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: 401, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { User, Admin } = require("../models");
    let identity = null;

    if (decoded.isAdmin) {
        identity = await Admin.findByPk(decoded.id);
        if (identity) identity.isAdmin = true;
    } else {
        identity = await User.findOne({ where: { uid: decoded.uid } });
        if (identity) identity.isAdmin = false;
    }

    if (!identity) {
      return res.status(401).json({ status: 401, message: "Identity not found" });
    }

    req.user = identity;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: "Invalid token" });
  }
};

module.exports = auth;
