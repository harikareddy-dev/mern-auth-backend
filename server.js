const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

console.log("SERVER STARTED");

// ✅ MongoDB Atlas connection (UPDATED with your password)
mongoose.connect(
  "mongodb+srv://test:123456q@cluster0.xlfrv74.mongodb.net/myapp?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Atlas Connected ✅"))
.catch(err => console.log("DB Error ❌", err));

// User model
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String
});

// Signup route
app.post("/api/auth/signup", async (req, res) => {
  console.log("SIGNUP HIT:", req.body);

  const user = new User(req.body);
  await user.save();

  console.log("USER SAVED");

  res.json({ message: "Signup success" });
});

// Login route
app.post("/api/auth/login", async (req, res) => {
  console.log("LOGIN HIT");

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log("USER FOUND:", user);

  if (!user || user.password !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login success",
    user: {
      name: user.name,
      email: user.email
    }
  });
});

// Start server
app.listen(5000, () => {
  console.log("Running on port 5000");
});