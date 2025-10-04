const express = require('express');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const router = express.Router();

// File paths
const ordersFilePath = path.join(__dirname, '../orders/orders.json');
const paymentsFilePath = path.join(__dirname, '../payments/payments.json');
const successOutputFile = path.join(__dirname, '../sucessfullOrders/sucessfull_orders.json');

// Ensure the output directory exists
if (!fs.existsSync(path.dirname(successOutputFile))) {
    fs.mkdirSync(path.dirname(successOutputFile), { recursive: true });
}

// Helper function to read JSON files
const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading file at ${filePath}:`, err);
        return [];
    }
};

// Helper function to write JSON to a single file
const writeJsonFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`File saved successfully at ${filePath}`);
    } catch (err) {
        console.error(`Error writing file at ${filePath}:`, err);
    }
};

// Merge and save successful orders into one file
const mergeAndSaveSuccessfulOrders = () => {
    console.log('Starting merge process...');
    const orders = readJsonFile(ordersFilePath);
    const payments = readJsonFile(paymentsFilePath);

    const mergedOrders = [];

    orders.forEach((order) => {
        const matchingPayment = payments.find(
            (payment) => payment.orderId === order.orderId
        );

        if (matchingPayment) {
            // Check if the payment status is "success"
            if (matchingPayment.paymentStatus === 'success') {
                // For successful payments, include paymentDetails
                const mergedData = {
                    ...order,
                    paymentDetails: matchingPayment,
                };
                mergedOrders.push(mergedData);
            }
        }
            if (order.selectedPayment && order.selectedPayment === 'Dobírka') {
                // For "Dobírka" payments, don't include paymentDetails
                const mergedData = {
                    ...order,
                    paymentDetails: null, // Optional, to indicate no paymentDetails
                };
                mergedOrders.push(mergedData);
            }

    });

    // Write all successful orders (including "Dobírka") to one file
    writeJsonFile(successOutputFile, mergedOrders);

    console.log('Merge process completed.');
};

// Endpoint to trigger the merge process manually
router.get('/run', (req, res) => {
    try {
        mergeAndSaveSuccessfulOrders();
        res.status(200).json({ message: 'Merge process completed successfully.' });
    } catch (error) {
        console.error('Error during merge process:', error);
        res.status(500).json({ message: 'Error during merge process.' });
    }
});

// Automatically trigger the merge process every 15 minutes
cron.schedule('*/15 * * * *', () => {
    console.log('Scheduled task: Running merge process...');
    mergeAndSaveSuccessfulOrders();
});

// Run the merge process immediately on server start
console.log('Running initial merge process...');
mergeAndSaveSuccessfulOrders();

module.exports = router;
