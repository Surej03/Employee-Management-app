const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/validatetokenhandler");

// User-specific employee routes (require authentication)
router.get('/profile', authenticateToken, (req, res) => {
  const user = req.user; // req.user contains the decoded token payload
  res.json({
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
