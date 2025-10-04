import React, { useState, useEffect } from "react";
import { EmailField } from "../formfields";
import "./Newsletter.css";

const NewsletterPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Check localStorage for the last closed timestamp
        const lastClosed = localStorage.getItem("newsletterPopupLastClosed");
        const now = new Date();

        if (lastClosed) {
            const lastClosedDate = new Date(lastClosed);
            // Check if the date is valid
            if (!isNaN(lastClosedDate.getTime()) && now - lastClosedDate > 28 * 24 * 60 * 60 * 1000) {
                setIsVisible(true);
            }
        } else {
            setIsVisible(true);
        }
    }, []);


    const closePopup = () => {
        setIsVisible(false);
        // Set the current timestamp in localStorage
        localStorage.setItem("newsletterPopupLastClosed", new Date().toISOString());
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) {
            alert("Please enter a valid email.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                alert("Thank you for subscribing!");
                closePopup();
            } else {
                alert("Something went wrong. Please try again later.");
            }
        } catch (error) {
            console.error("Error submitting email:", error);
            alert("Unable to subscribe at this time.");
        }
    };


    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <button className="popup-close-button" onClick={closePopup}>
                    &times;
                </button>
                <h2 className="popup-title">Subscribe to Our Newsletter</h2>
                <p className="popup-text">
                    Stay updated with the latest news and offers from MyFein!
                </p>
                <form onSubmit={handleSubmit} className="popup-form">
                    <EmailField
                        // className="popup-input"
                        value={email}
                        onChange={setEmail}
                    />
                    <button type="submit" className="popup-submit-button">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewsletterPopup;
