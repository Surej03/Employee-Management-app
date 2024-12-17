const express = require("express");
const authenticateToken = require("../middleware/validatetokenhandler");

const router = express.Router();

router.get("/profile", authenticateToken, (req, res) => {
  // Check if user data exists
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized, no valid token" });
  }

  const user = req.user;

  // Respond with user data
  res.json({
    userId: user.id,
    email: user.email
  });
});

module.exports = router;