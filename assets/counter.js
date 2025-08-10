// have fun skidding not even using it :sob:
const express = require("express");
const app = express();
const port = 3000;

const seenIPs = new Set();
let viewCount = 0;

// Serve static frontend files
app.use(express.static("public"));

// Middleware to get IP and count views
app.use((req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  
  if (!seenIPs.has(ip)) {
    seenIPs.add(ip);
    viewCount++;
  }
  next();
});

// API endpoint to get current view count
app.get("/api/views", (req, res) => {
  res.json({ views: viewCount });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});