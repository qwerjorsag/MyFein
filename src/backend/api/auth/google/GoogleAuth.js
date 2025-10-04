const express = require("express");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();

// Load the Google Client ID from environment variables
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

console.log(CLIENT_ID);

if (!CLIENT_ID) {
    throw new Error("Google Client ID is not set in environment variables");
}

const client = new OAuth2Client(CLIENT_ID);

// Google Auth function
const googleAuth = async (req, res) => {
    try {
        const { tokenId } = req.body;

        // Validate if tokenId is provided
        if (!tokenId) {
            console.error("Token ID not provided in the request body.");
            return res.status(400).json({ message: "Token ID is required for Google authentication." });
        }

        // Verify the ID token with Google
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            console.error("Invalid token payload.");
            return res.status(401).json({ message: "Invalid token payload" });
        }

        const { email, name, picture } = payload;

        // Split the name into firstName and lastName
        const nameParts = name.split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ");  // Join the remaining parts as last name

        // Store user details in sessionStorage (client side)
        const user = {
            email,
            firstName,
            lastName,
            picture,
        };

        console.log("Google login successful:", user);

        // Optionally, you could generate a JWT token here (if you're using JWT)
        // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Send the response with user data to the client
        res.status(200).json({
            message: "Google login successful",
            user,
            // token, // Uncomment if using JWT
        });
    } catch (err) {
        console.error("Error during Google authentication:", err);
        res.status(500).json({ message: "Server error during Google authentication" });
    }
};

// Define the route
router.post("/", googleAuth);

// Export the router so it can be used in the main server
module.exports = router;
