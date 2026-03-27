const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Save Feedback
app.post("/feedback", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newFeedback = new Feedback({
      name,
      email,
      message
    });

    await newFeedback.save();

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend running with MongoDB 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});