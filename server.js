// server.js
import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // required for Render
});

app.use(bodyParser.json());

// Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    name TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

// Save feedback
app.post("/feedback", async (req, res) => {
  const { name, message } = req.body;
  try {
    await pool.query("INSERT INTO feedback (name, message) VALUES ($1, $2)", [name, message]);
    res.json({ success: true, message: "Feedback saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// Get all feedback
app.get("/feedback", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM feedback ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
