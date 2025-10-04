const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Path to reviews.json
const reviewsFilePath = path.join(__dirname, "../../api/review/reviews.json");

// Utility function to generate a unique ID for each review (optional)
const generateId = () => {
    return `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// POST /api/reviews - Create a new review
router.post("/", (req, res) => {
    const { name, rating, reviewText, date } = req.body;

    // Log incoming data
    console.log("Received review data:", req.body);

    if (!name || !rating || !reviewText || !date) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Read current reviews asynchronously
    fs.readFile(reviewsFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading reviews file:", err);
            return res.status(500).json({ message: "Error reading reviews file" });
        }

        let reviews = [];

        try {
            // If the file is empty or contains invalid JSON, initialize as empty array
            reviews = data ? JSON.parse(data) : [];
        } catch (err) {
            console.error("Error parsing reviews file:", err);
            return res.status(500).json({ message: "Error parsing reviews data" });
        }

        // Generate a unique ID for the new review (optional)
        const reviewId = generateId();

        // Automatically set reviewDate to the current timestamp
        const reviewDate = new Date().toISOString();

        // Add the new review to the array
        const newReview = { id: reviewId, name, rating, reviewText, date, reviewDate };
        reviews.push(newReview);

        // Save updated reviews back to the JSON file asynchronously
        fs.writeFile(reviewsFilePath, JSON.stringify(reviews, null, 2), 'utf-8', (err) => {
            if (err) {
                console.error("Error writing to reviews file:", err);
                return res.status(500).json({ message: "Error saving review" });
            }

            res.status(200).json({ message: "Review submitted successfully." });
        });
    });
});

module.exports = router;
