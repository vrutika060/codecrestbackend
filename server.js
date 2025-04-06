
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const rateLimit = require("express-rate-limit"); // Import rate limiter
// const reviewRoutes = require("./routes/reviewRoutes");
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());  // ✅ Fixed CORS for Deployment

// // Rate Limiting Middleware (Limits each IP to 5 requests per minute)
// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 5, // Limit each IP to 5 requests per minute
//   message: "❌ Too many requests, please try again later.",
// });

// // Apply Rate Limiter ONLY to Review Submission Route
// app.use("/api/reviews", limiter);

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1); // Stop server if MongoDB fails
//   });

// // Routes
// app.use("/api/reviews", reviewRoutes);

// // Add this route to handle '/'
// app.get("/", (req, res) => {
//   res.send("✅ Welcome to CodeCrest API. Use /api/reviews to access review data.");
// });

// // Server Listening
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.set("trust proxy", 1); // Trust the first proxy


// Middleware
app.use(express.json());

// CORS (update with your frontend Railway link)
app.use(cors({
  origin: [
    "https://codecrestgithubio-production.up.railway.app", // 👈 ✅ Your deployed frontend
    "http://localhost:5173", // ✅ For local testing
  ],
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
}));


// Rate Limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10, // increased for production
  message: "❌ Too many requests, please try again later.",
});
app.use("/api/reviews", limiter);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("✅ Welcome to CodeCrest API. Use /api/reviews to access review data.");
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
