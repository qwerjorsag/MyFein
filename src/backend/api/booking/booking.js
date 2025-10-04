const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Define the path to the bookings.json file
const filePath = path.join(__dirname, '../../api/booking/bookings.json');

// Endpoint to receive booking data (POST)
router.post('/', (req, res) => {
    const bookingData = req.body;

    // Read existing bookings
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Server error reading file.' });
        }

        let bookings = [];
        if (data) {
            try {
                bookings = JSON.parse(data);  // Parse the existing JSON data
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                return res.status(500).json({ message: 'Server error parsing file.' });
            }
        }

        // Add new booking
        bookings.push(bookingData);

        // Write the updated bookings back to the file
        fs.writeFile(filePath, JSON.stringify(bookings, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
                return res.status(500).json({ message: 'Server error writing file.' });
            }

            res.status(200).json({ message: 'Booking saved successfully!' });
        });
    });
});

module.exports = router;
