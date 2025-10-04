import React from "react";
import { useParams } from "react-router-dom";

const OrderCompletedPage: React.FC = () => {
    const { orderId } = useParams();  // Extract orderId from URL
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails") || "{}");

    if (!orderDetails || !orderId) {
        return <p>Error: Order not found.</p>;
    }

    const { totalPrice, firstName, lastName, email, city, deliveryMethod, branch } = orderDetails;

    return (
        <div>
            <h1>Order Completed</h1>
            <p>Thank you for your purchase, {firstName} {lastName}!</p>
            <p>Your order (ID: {orderId}) has been successfully processed.</p>
            <p>Total Price: {totalPrice} Kč</p>
            <p>
                Delivery Method: {deliveryMethod}
                {deliveryMethod === 'Vyzvednutí na prodejně' && branch ? ` - ${branch}` : ''}
            </p>

            <p>Shipping to: {city}</p>
            <p>Email: {email}</p>
            <button onClick={() => window.location.href = '/'}>Back to Homepage</button>
        </div>
    );
};

export default OrderCompletedPage;
