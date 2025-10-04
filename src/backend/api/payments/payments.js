const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Define the path to the payments.json file
const filePath = path.join(__dirname, '../../api/payments/payments.json');

// Endpoint to save payment data (POST)
router.post('/', (req, res) => {
    const paymentData = req.body;

    const paymentId = generatePaymentId();  // Generate unique payment ID

    const paymentWithId = {
        paymentId: paymentId, // Adding the generated payment ID
        ...paymentData,       // Existing payment data
    };

    // Read existing payments data
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Server error reading file.' });
        }

        let payments = [];
        if (data) {
            try {
                payments = JSON.parse(data);  // Parse the existing JSON data
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                return res.status(500).json({ message: 'Server error parsing file.' });
            }
        }

        // Add the new payment with paymentId
        payments.push(paymentWithId);

        // Write the updated payments back to the file
        fs.writeFile(filePath, JSON.stringify(payments, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
                return res.status(500).json({ message: 'Server error writing file.' });
            }

            res.status(200).json({
                message: 'Payment saved successfully!',
                paymentId: paymentWithId.paymentId,  // Send back the generated payment ID
            });
        });
    });
});

// Helper function to generate a unique payment ID
function generatePaymentId() {
    return `payment-${Date.now()}`;  // Using timestamp to create a unique ID
}

module.exports = router;
