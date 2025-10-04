import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// // Load Stripe outside of a component to avoid reloading on every render.
// const stripePromise = loadStripe("pk_test_51Qjne8P7hGNKfrvtRCgZH7jZ9dwonYUIXlv1D8aa4EyM0nbhlEdcsd2kl9i2baweuJmTCkfjjYCzNjc2NDnGo02u00xoeoBjSJ");

const StripePayment: React.FC = () => {
    const stripePromise = loadStripe("pk_test_51Qjne8P7hGNKfrvtRCgZH7jZ9dwonYUIXlv1D8aa4EyM0nbhlEdcsd2kl9i2baweuJmTCkfjjYCzNjc2NDnGo02u00xoeoBjSJ");
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId, orderDetails, totalPrice } = location.state || {};

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

    // Error check for missing details
    if (!orderId || !orderDetails || totalPrice === undefined) {
        return <p>Error: Missing order details or total price.</p>;
    }

    // Call hooks unconditionally here, before any conditional logic
    const stripe = useStripe();
    const elements = useElements();

    // Handle payment when stripe and elements are available
    const handlePayment = async () => {
        setIsProcessing(true);

        // Check if Stripe and Elements are ready
        if (!stripe || !elements) {
            console.error("Stripe or elements not loaded.");
            setPaymentStatus("failed");
            alert("Stripe has not loaded properly. Please try again.");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        // Ensure CardElement is available
        if (!cardElement) {
            console.error("CardElement not available.");
            setPaymentStatus("failed");
            alert("CardElement is not available. Please try again.");
            return;
        }

        try {
            // Request backend to create a PaymentIntent
            const response = await fetch("http://localhost:5000/api/stripe/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: totalPrice * 100, // Convert to the smallest currency unit (e.g., cents)
                    currency: "czk", // Specify currency
                }),
            });

            const { clientSecret } = await response.json();

            // Confirm the payment with Stripe
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (result.error) {
                console.error("Payment failed:", result.error.message);
                setPaymentStatus("failed");
                alert("Payment failed. Please try again.");
            } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
                setPaymentStatus("success");

                // Optionally, save payment info to backend
                const paymentData = {
                    orderId,
                    totalPrice,
                    paymentStatus: "success",
                    paymentMethod: "Stripe",
                };

                await fetch("http://localhost:5000/api/payments", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paymentData),
                });

                // Navigate to order completed page
                navigate(`/order-completed/${orderId}`);
            }
        } catch (error) {
            console.error("Payment initialization error:", error);
            alert("There was an error processing your payment. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Elements stripe={stripePromise}>
            <div>
                <h1>Stripe Payment</h1>
                <p>Processing payment for Order ID: {orderId}</p>
                <p>Total Price: {totalPrice} Kč</p>

                <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                    <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                        {/* CardElement with some options */}
                        <CardElement options={{ hidePostalCode: true }} />
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        style={{
                            marginTop: "20px",
                            padding: "10px 20px",
                            backgroundColor: "#007BFF",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        {isProcessing ? "Processing..." : "Proceed to Payment"}
                    </button>
                </form>

                {paymentStatus && <p>Payment Status: {paymentStatus}</p>}
            </div>
        </Elements>
    );
};

export default StripePayment;
