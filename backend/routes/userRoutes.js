const express = require("express");
const router = express.Router();  // 🔑 This line was missing
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register
router.post("/register", async (req, res) => {
  try {
    const { full_name, email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ full_name, email, username, password: hashedPassword });
    await user.save();
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
