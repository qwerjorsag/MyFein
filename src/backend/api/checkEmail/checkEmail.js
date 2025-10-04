const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Load user data from JSON file
const usersFilePath = 'src/backend/api/users.json';
let users = [];

// Function to load users from the file
const loadUsers = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        users = JSON.parse(data);
    } catch (error) {
        console.error('Error loading users:', error);
    }
};

// Load users initially
loadUsers();

// POST /api/check-email
router.post('/check-email', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const emailExists = users.some(user => user.email === email);
    res.json({ exists: emailExists });
});

// Export the router
module.exports = router;
