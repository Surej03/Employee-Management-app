const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to authenticate users using the authorization header
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json("Unauthorized");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decodedUser) => {
    if (err) {
      return res.status(401).json({message : "Token is not valid",error: err.message});
    }
    // Attach the decoded user information
    console.log("DecodedUser: ",decodedUser)
    req.user = decodedUser;
    next();
  });
};

module.exports = authenticateToken;