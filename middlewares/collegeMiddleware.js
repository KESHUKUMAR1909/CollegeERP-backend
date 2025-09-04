const jwt = require("jsonwebtoken");
const collegeRepo = require("../repository/collegeRepo");
const { compareFunc } = require("../utils/bcryptFun");
require('dotenv').config();

const collegeAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided or invalid format" });
    }

    const token = authHeader.split(" ")[1]; // Extract actual token
    // Step 1: Decode token (to get collegeId)
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.collegeId) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    // Step 2: Find college by ID
    const college = await collegeRepo.findByCollegeId(decoded.collegeId);
    if (!college) {
      return res.status(403).json({ message: "College not found" });
    }

    // Step 3: Compare provided token with stored hashed token
    const isMatch = await compareFunc(token, college.token);
    if (!isMatch) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Step 4: Verify JWT using college.uniqueErpId

    jwt.verify(token, process.env.secret);

    // Step 5: Check token expiry
    if (!college.tokenExpireAt || college.tokenExpireAt < new Date()) {
      return res.status(403).json({ message: "Token expired" });
    }

    req.college = college;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired token", error: err.message });
  }
};

module.exports = {
  collegeAuthMiddleware
};
