const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://rajeshwari_db_user:Raju123@ac-pxaqvmf-shard-00-00.i2ra7dq.mongodb.net:27017,ac-pxaqvmf-shard-00-01.i2ra7dq.mongodb.net:27017,ac-pxaqvmf-shard-00-02.i2ra7dq.mongodb.net:27017/?ssl=true&replicaSet=atlas-zww569-shard-0&authSource=admin&appName=Cluster0")
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
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save" });
  }
});

// Test
app.get("/", (req, res) => {
  res.send("Backend running with MongoDB 🚀");
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});