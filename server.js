const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API route for feedback
app.post("/feedback", (req, res) => {
  const feedback = req.body;

  // Save feedback into a file
  const feedbackPath = path.join(__dirname, "feedback.json");

  // Read existing feedbacks
  let feedbacks = [];
  if (fs.existsSync(feedbackPath)) {
    const data = fs.readFileSync(feedbackPath);
    feedbacks = JSON.parse(data);
  }

  // Add new feedback
  feedbacks.push({
    ...feedback,
    time: new Date().toISOString()
  });

  // Save back to file
  fs.writeFileSync(feedbackPath, JSON.stringify(feedbacks, null, 2));

  console.log("📩 Feedback saved:", feedback);

  res.json({ message: "✅ Feedback saved successfully!", data: feedback });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
