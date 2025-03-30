// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const reviewRoutes = require("./routes/reviewRoutes");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" })); // Allow frontend URL

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// // Routes
// app.use("/api/reviews", reviewRoutes);

// // Server Listening
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const reviewRoutes = require("./routes/reviewRoutes");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173" }));

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1); // Stop server if MongoDB fails
//   });

// // Routes
// app.use("/api/reviews", reviewRoutes);

// // Server Listening
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


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

// Server Listening
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
