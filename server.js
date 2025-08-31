const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// API route to save feedback
app.post("/feedback", async (req, res) => {
  try {
    const { name, message } = req.body;
    await pool.query("INSERT INTO feedback (name, message) VALUES ($1, $2)", [name, message]);
    res.status(201).json({ success: true, message: "Feedback saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

// API route to fetch feedback
app.get("/feedback", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM feedback ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
