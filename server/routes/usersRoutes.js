// Import necessary modules and controllers
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers");
const authenticateToken = require("../middleware/validatetokenhandler")
const userempcontroller = require("../controllers/userempcontroller")

// Public routes
router.post('/signin', usersController.signIn);
router.post('/signup', usersController.signUp);
router.post('/signout', usersController.signout);

router.get('/user/employees',authenticateToken,userempcontroller.getUserEmployees);

module.exports = router;