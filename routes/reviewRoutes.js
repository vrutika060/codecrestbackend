const express = require("express");
const router = express.Router();
const Review = require("../models/Review");



router.get("/", async (req, res) => {
    try {
     // const reviews = await Review.find().sort({ _id: -1 }); // Fetch all reviews (latest first)
     const reviews = await Review.find().sort({ createdAt: -1 }); // Most recent first
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  

// third try
router.post("/", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging

    const { name, review, rating } = req.body;
    if (!name || !review || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //const newReview = new Review({ name, review, rating, date: new Date().toLocaleString() });
    const newReview = new Review({ name, review, rating });

    await newReview.save();

    res.status(201).json({ message: "Review saved successfully", data: newReview });
  } catch (error) {
    console.error("❌ Error saving review:", error);
    res.status(500).json({ message: "Server error" });
  }
});




// ➤ Delete a review
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
