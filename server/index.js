const express = require("express");
const cors = require("cors");
require('log-timestamp');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const employeeRoutes = require("./routes/employeesRoutes");
const usersroutes = require("./routes/usersRoutes");
const profileroutes = require("./routes/profileRoutes")
const authenticateToken = require("./middleware/validatetokenhandler");

const app = express();
const port = 8000;

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/employee", authenticateToken, employeeRoutes);
app.use('/auth', usersroutes);
app.use("/profile", profileroutes)

app.all("*", (req, res) => {
  res.status(404).json({ error: "Page Not Found" });
});


// Static files
app.use(express.static("images"));

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});