
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit"); // Import rate limiter
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // ✅ Fixed CORS for Deployment

// Rate Limiting Middleware (Limits each IP to 5 requests per minute)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per minute
  message: "❌ Too many requests, please try again later.",
});

// Apply Rate Limiter ONLY to Review Submission Route
app.use("/api/reviews", limiter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop server if MongoDB fails
  });

// Routes
app.use("/api/reviews", reviewRoutes);

// Add this route to handle '/'
app.get("/", (req, res) => {
  res.send("✅ Welcome to CodeCrest API. Use /api/reviews to access review data.");
});

// Server Listening
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
