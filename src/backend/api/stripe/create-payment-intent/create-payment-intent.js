const express = require("express");
require("dotenv").config(); // načteme .env proměnné
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // vezmeme klíč z .env
const router = express.Router();

// Define the route correctly with a leading slash ("/")
router.post("/", async (req, res) => {
    const { amount, currency } = req.body;

    // Validate the request body
    if (!amount || !currency) {
        return res.status(400).json({ error: "Amount and currency are required" });
    }

    try {
        // Create a PaymentIntent with the provided amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        // Send back the client secret so the frontend can confirm the payment
        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating PaymentIntent:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
