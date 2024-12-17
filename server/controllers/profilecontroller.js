// controllers/profileController.js
const getUserProfile = (req, res) => {
    try {
      // Access the user data attached by the authenticateToken middleware
      const user = req.user;
  
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
  
      // Send back the user profile data
      res.json({
        userId: user.id,
        email: user.email
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = { getUserProfile };
  