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

// Endpoint to save user data
router.post('/', async (req, res) => {
    const { firstName, lastName, address, city, postalCode, email, password, role = 'user' } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !address || !city || !postalCode || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Restrict role assignment for security (optional)
    const allowedRoles = ['user', 'admin', 'moderator'];
    if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    // Hash the password
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ message: 'Error processing password' });
    }

    // Define the file path where the user data will be saved
    const filePath = path.resolve('src/backend/api/users.json');
    console.log('File path:', filePath);  // Log the file path for debugging

    // Read the current users data from the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code === 'ENOENT') {
            // If the file doesn't exist, create a new file with the first user (ID: 1)
            console.log('File does not exist, creating new file');
            const newUser = [{ id: 1, firstName, lastName, address, city, postalCode, email, password: hashedPassword, role }];
            fs.writeFile(filePath, JSON.stringify(newUser, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return res.status(500).json({ message: 'Error writing to file' });
                }
                return res.status(200).json({ message: 'User registered successfully', id: 1 });
            });
        } else if (data) {
            try {
                const users = JSON.parse(data);
                console.log('Users read from file:', users); // Log users read from file

                // Check if the email already exists
                const emailExists = users.some(user => user.email === email);
                if (emailExists) {
                    return res.status(409).json({ message: 'Email already taken' });
                }

                // Generate a new user ID by finding the max ID and adding 1, ensure valid number
                const newUserId = users.length > 0
                    ? Math.max(...users.map(user => Number(user.id))) + 1
                    : 1;
                console.log('New user ID:', newUserId); // Log the new user ID

                // Create the new user object (id as number)
                const newUser = {
                    id: newUserId,  // Ensure id is a number
                    firstName,
                    lastName,
                    address,
                    city,
                    postalCode,
                    email,
                    password: hashedPassword,
                    role
                };

                // Log the new user before adding it
                console.log('New user to add:', newUser);

                // Add the new user to the array
                users.push(newUser);

                // Write the updated users array to the file
                fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing to file:', err);
                        return res.status(500).json({ message: 'Error writing to file' });
                    }
                    return res.status(200).json({ message: 'User registered successfully', id: newUserId });
                });
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                return res.status(500).json({ message: 'Error parsing data' });
            }
        } else {
            console.error('Unexpected error reading file:', err);
            return res.status(500).json({ message: 'Unexpected error reading file' });
        }
    });
});

module.exports = router;
