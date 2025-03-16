const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User.model")

router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // Hash the password before saving to the database
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create the new user in the database
    await User.create({ 
      fullname, 
      email, 
      password: passwordHash 
    });
    
    // Send response
    res.status(201).json({ status: "ok", message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "An unexpected error occurred" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: "error", message: "Incorrect email or password" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isValidLogin = await bcrypt.compare(password, user.password);
    if (isValidLogin) {
      // Create JWT token
      const jwtToken = jwt.sign(
        { uid: user._id, isAdmin: user.isAdmin },
        "xbayGAKAu",
        { expiresIn: "3d" }
      );
      
      return res.json({ status: "ok", message: "Login successful", accessToken: jwtToken });
    } else {
      return res.status(401).json({ status: "error", message: "Incorrect email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "An unexpected error occurred" });
  }
});

module.exports = router;
