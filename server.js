const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* ===============================
   🔗 MongoDB Connection
   =============================== */

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

/* ===============================
   📄 Schema & Model
   =============================== */

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

/* ===============================
   📩 Routes
   =============================== */

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

    res.json({ success: true, message: "Feedback saved!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving feedback" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend running with MongoDB 🚀");
});

/* ===============================
   🚀 Server Start
   =============================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});