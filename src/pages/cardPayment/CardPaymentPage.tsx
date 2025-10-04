import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CardPayment: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId, orderDetails, totalPrice } = location.state || {};

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

    if (!orderId || !orderDetails || totalPrice === undefined) {
        return <p>Error: Missing order details or total price.</p>;
    }

    // Save order details to localStorage (optional)
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    const handlePaymentAttempt = async (isSuccess: boolean) => {
        setIsProcessing(true);
        setPaymentStatus(isSuccess ? "success" : "failed");

        // Payment info to be saved
        const paymentData = {
            orderId,
            totalPrice,
            paymentStatus: isSuccess ? "success" : "failed", // Change status based on the attempt
            paymentMethod: 'Card',  // Can change based on actual payment method
        };

        // Send payment information to backend API
        try {
            const response = await fetch('http://localhost:5000/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
                throw new Error('Failed to record payment');
            }

            // If payment is successful, navigate to the order completed page
            if (isSuccess) {
                navigate(`/order-completed/${orderId}`);
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Error saving payment:', error);
            alert('There was an error processing your payment.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <h1>Card Payment</h1>
            <p>Processing payment for Order ID: {orderId}</p>
            <p>Total Price: {totalPrice} Kč</p>

            <button
                onClick={() => handlePaymentAttempt(true)}
                disabled={isProcessing}
            >
                Complete Payment
            </button>

            {/* Example button for simulating a failed payment attempt */}
            <button
                onClick={() => handlePaymentAttempt(false)}
                disabled={isProcessing}
            >
                Simulate Failed Payment
            </button>

            {isProcessing && <p>Processing your payment...</p>}
            {paymentStatus && <p>Payment Status: {paymentStatus}</p>}
        </div>
    );
};

export default CardPayment;
