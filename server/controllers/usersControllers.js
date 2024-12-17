const bcrypt = require("bcrypt");
const saltRounds = 10;
const userModels = require("../models/usermodels");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Import authenticateToken from validatetokenhandler.js
const authenticateToken = require("../middleware/validatetokenhandler");

// Signup
const signUp = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await userModels.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: `Email ${email} already in use.` });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await userModels.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        email: email,
        userName: userName
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '8h' }
    );

    // Set the JWT token in a cookie
    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    });

    const data = {
      userName: userName,
      email: email
    }

    res.status(201).json({ success: true, message: 'User created successfully!', token: accessToken, user: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create user.' });
  }
};

// Sign-in
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await userModels.findByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found. Please sign up first.' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password.' });
    }

    // Generate JWT token if login is successful
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '8h' }
    );

    // Set the JWT token in a cookie and return a success response
    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    });

    const data = {
      userName: user.userName,
      email: email
    }

    res.status(200).json({
      success: true,
      message: 'Sign-in successful.',
      userId: user.id,
      user: data,
      accessToken
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Database error.' });
  }
};

// Sign-out
const signout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
  });

  res.status(200).json({ success: true, message: 'Signed out successfully.' });
};

// Protected Route
const protectedRoute = (req, res) => {
  res.status(200).json({ success: true, message: 'This is a protected route.', user: req.user });
};

module.exports = {
  signUp,
  signIn,
  signout,
  authenticateToken,
  protectedRoute,
};