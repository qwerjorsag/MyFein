const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();


// Import the API routes for booking
const apiRoutes = require('./api');

// Initialize the Express app
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

app.use(cors());

// API routes
app.use('/api', apiRoutes); // All your routes start with /api

// Catch-all for undefined routes (optional)
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
