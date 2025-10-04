const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');
const app = express();

const router = express.Router();

// Enable CORS for all origins
router.use(cors());

// Middleware to parse JSON bodies
router.use(express.json());

// Endpoint to handle login
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Define the file path where the user data is stored
    const filePath = path.resolve('src/backend/api/users.json');

    // Read the users data from the JSON file
    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        try {
            const users = JSON.parse(data); // Parse the users data
            const user = users.find((user) => user.email === email); // Find user by email

            if (user) {
                // Compare the hashed password with the provided password
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (isPasswordValid) {
                    // If the password is valid, return the user data
                    return res.status(200).json({
                        message: 'Login successful',
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        address: user.address,
                        city: user.city,
                        postalCode: user.postalCode,
                        email: user.email,
                        role: user.role,
                    });
                } else {
                    // If the password is invalid, send an error message
                    return res.status(400).json({ message: 'Invalid email or password' });
                }
            } else {
                // If no matching user is found, send an error message
                return res.status(400).json({ message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            return res.status(500).json({ message: 'Error parsing data' });
        }
    });
});

module.exports = router;
