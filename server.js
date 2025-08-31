const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 🔹 Connect to MongoDB
const mongoURI = process.env.MONGO_URI || "your-mongodb-connection-string-here";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 🔹 Define Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  feedback: String,
  time: { type: Date, default: Date.now }
});
const Feedback = mongoose.model("Feedback", feedbackSchema);

// 🔹 API route for feedback
app.post("/feedback", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    console.log("📩 Feedback saved:", req.body);
    res.json({ message: "✅ Feedback saved to MongoDB!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Error saving feedback" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
