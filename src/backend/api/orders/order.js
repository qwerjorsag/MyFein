const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Define the path to the orders.json file
const filePath = path.join(__dirname, '../../api/orders/orders.json');

// Endpoint to receive booking data (POST)
router.post('/', (req, res) => {
    const ordersData = req.body;

    // Extract userId from the request body
    const userId = ordersData.userId || "defaultUserId"; // Default or fetched from session
    const orderId = generateOrderId(); // Function to generate a unique orderId
    const orderDate = new Date().toISOString(); // Get the current date and time in ISO format

    // Add userId, orderId, and orderDate to the order data
    const orderWithDetails = {
        userId: userId,  // Adding userId
        orderId: orderId,  // Adding orderId
        orderDate: orderDate,  // Adding date and time
        ...ordersData,  // Existing order data
    };

    // Read existing orders data
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Server error reading file.' });
        }

        let orders = [];
        if (data) {
            try {
                orders = JSON.parse(data);  // Parse the existing JSON data
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                return res.status(500).json({ message: 'Server error parsing file.' });
            }
        }

        // Add the new order with userId, orderId, and orderDate
        orders.push(orderWithDetails);

        // Write the updated orders back to the file
        fs.writeFile(filePath, JSON.stringify(orders, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
                return res.status(500).json({ message: 'Server error writing file.' });
            }

            // Send the response with orderId and orderDate
            res.status(200).json({
                message: 'Order saved successfully!',
                orderId: orderWithDetails.orderId,
                orderDate: orderWithDetails.orderDate
            });
        });
    });
});

// Helper function to generate a unique orderId
function generateOrderId() {
    // Example of generating a unique orderId using a timestamp
    return `order-${Date.now()}`;
}

module.exports = router;
