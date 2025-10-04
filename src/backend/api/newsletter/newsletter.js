const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to the newsletter JSON file
const newsletterDataPath = path.join(__dirname, '../../api/newsletter/newsletter.json');

// Utility function to generate a unique ID
const generateId = () => {
    return `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// API route to handle the email subscription
router.post('/', (req, res) => {
    const {email} = req.body;

    if (!email || !email.trim()) {
        return res.status(400).send({message: "Please provide a valid email address."});
    }

    // Read the current data from the JSON file
    fs.readFile(newsletterDataPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send({message: "Error reading the newsletter file."});
        }

        let existingData;

        try {
            // Parse the data if possible, else default to an empty object
            existingData = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).send({message: "Error parsing the newsletter file."});
        }

        // Initialize the data object if it's undefined
        if (!existingData) {
            existingData = {};
        }

        // Generate a unique ID for the new subscription
        const newId = generateId();

        // Check if the email already exists as a key in the object
        if (existingData[newId]) {
            return res.status(400).send({message: "This email is already subscribed."});
        }

        // Add the new subscription using the generated ID as the key
        existingData[newId] = {
            id: newId,
            email,
            dateSubscribed: new Date().toISOString()
        };

        // Write the updated data back to the JSON file
        fs.writeFile(newsletterDataPath, JSON.stringify(existingData, null, 2), 'utf-8', (err) => {
            if (err) {
                return res.status(500).send({message: "Error saving the email data."});
            }

            res.status(200).send({message: "Thank you for subscribing!"});
        });
    });
});

module.exports = router;
