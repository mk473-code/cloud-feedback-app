const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend files

// API route for feedback
app.post("/feedback", (req, res) => {
  const feedback = req.body;
  console.log("📩 Feedback received:", feedback);
  res.json({ message: "Thank you for your feedback!", data: feedback });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
