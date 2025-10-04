import React, { useState } from "react";
import { TextField, Box, Button, Tooltip } from "@mui/material";
import HoverRating from "../reviewStars/HoverRating";
import DateMui from "../dateMUI/DateMui";
import {getTodayDate} from "@mui/x-date-pickers/internals"; // Import the date picker component

const ReviewContainer = () => {
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState<number | null>(2);
    const [selectedDate, setSelectedDate] = useState<string | null>(null); // State for the date

    // Function to check if the button should be disabled
    const isFormValid = () => {
        return name.length > 3 && reviewText.length > 3 && selectedDate !== null;
    };

    // Handle the submission of the review
    const handleSubmit = async () => {
        const review = {
            name,
            reviewText,
            rating,
            date: selectedDate, // Use the selected date
        };

        try {
            const response = await fetch("http://localhost:5000/api/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(review),
            });

            // Check if the response is OK (status code 200)
            if (!response.ok) {
                const errorMessage = await response.text(); // Read the response body as text
                throw new Error(`Server error: ${errorMessage}`);
            }

            const data = await response.json();
            alert(data.message); // Assuming the backend responds with a message field

            // Clear the form fields after successful submission
            setName("");
            setReviewText("");
            setRating(4.5); // Reset rating to the initial value
            setSelectedDate(null); // Reset the selected date

        } catch (error) {
            console.error("Error submitting review:", error);
            alert(`Failed to submit review. Error: ${error.message}`);
        }
    };

    const isDisabled = !isFormValid();

    // Function to handle name input change
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Capitalize the first letter and ensure the rest is lowercase
        const formattedValue = value
            .replace(/[^a-zA-ZÀ-ÿ\s]/g, "")  // Only allow letters and spaces
            .replace(/^(.)/, (match) => match.toUpperCase()); // Capitalize the first letter

        setName(formattedValue);
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", p: 2 }}>
            <TextField
                required
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={handleNameChange}
            />
            <TextField
                required
                label="Review"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
            />
            <Box sx={{ my: 2 }}>
                {/* Date Picker Component */}
                <DateMui onDateChange={(date) => setSelectedDate(date)} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <HoverRating rating={rating} setRating={setRating} />

                {/* Only show Tooltip when the button is disabled */}
                {isDisabled ? (
                    <Tooltip title="Please fill in all fields, including the date, with more than 3 characters.">
                        <span style={{ cursor: 'not-allowed' }}>
                            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isDisabled}>
                                Submit Review
                            </Button>
                        </span>
                    </Tooltip>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isDisabled}>
                        Submit Review
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ReviewContainer;
