const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

const MPGS_API_BASE = "https://YOUR_MPGS_API_URL"; // Replace with actual URL
const MERCHANT_ID = "TEST";
const API_PASSWORD = "YOUR_API_PASSWORD";
const API_USERNAME = "merchant." + MERCHANT_ID;

// Route to initiate payment
router.post("/initiate-payment", async (req, res) => {
    const { orderId, totalPrice, currency } = req.body;

    try {
        // Create session with MPGS
        const response = await fetch(`${MPGS_API_BASE}/session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + Buffer.from(API_USERNAME + ":" + API_PASSWORD).toString("base64"),
            },
            body: JSON.stringify({
                apiOperation: "INITIATE_CHECKOUT",
                interaction: {
                    operation: "PURCHASE",
                },
                order: {
                    id: orderId,
                    amount: totalPrice,
                    currency,
                },
            }),
        });

        const data = await response.json();

        if (response.ok) {
            res.json({ paymentUrl: data.result.redirectUrl });
        } else {
            res.status(400).json({ message: data.message || "Failed to create payment session" });
        }
    } catch (error) {
        console.error("Error initiating payment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
