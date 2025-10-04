import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Box, Typography, Tooltip} from "@mui/material";

// Sample review data (you can replace it with your actual review JSON)
import reviewsData from "../../backend/api/review/reviews.json"; // Adjust the import path if needed

interface ReviewProps {
    name: string;
    rating: number;
    reviewText: string;
    date: string;
}

const SimpleSlider: React.FC = () => {
    const [reviews, setReviews] = useState<ReviewProps[]>([]);

    useEffect(() => {
        setReviews(reviewsData); // Setting the reviews data (replace with actual API or JSON)
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: true,
        arrows: false,

    };

    return (
        <div className="slider-container" style={{width: " 500px", margin: "0 auto", gap: "10px"}}>
            <Slider {...settings}>
                {reviews.map((review, index) => (
                    <div key={index}>
                        <Box sx={{
                            padding: 2,
                            textAlign: "center",
                            backgroundColor: "#fff8f1",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            margin: "0 10px",
                            height: "125px",
                        }}>
                            <Typography variant="h6">{review.name}</Typography>
                            <Typography variant="body1" sx={{marginTop: 1}}>
                                Rating: {review.rating} ⭐
                            </Typography>
                            <Tooltip title={review.reviewText} arrow>
                                <Typography variant="body2" sx={{ marginTop: 1, cursor: "pointer" }}>
                                    {review.reviewText.length > 20
                                        ? `${review.reviewText.substring(0, 20)}...`
                                        : review.reviewText}
                                </Typography>
                            </Tooltip>

                            <Typography variant="caption" sx={{marginTop: 1, display: "block", color: "gray"}}>
                                {review.date}
                            </Typography>
                        </Box>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SimpleSlider;
