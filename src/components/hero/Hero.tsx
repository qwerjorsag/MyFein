import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, styled } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from React Router
import { keyframes } from "@mui/system";
import { FiArrowRight } from "react-icons/fi";
import theme from "../../theme/theme";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const HeroContainer = styled(Box)(({ theme }) => ({
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
        height: "80vh",
    },
}));

const ImageSlide = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    transition: "opacity 1s ease-in-out",
    "&.active": {
        opacity: 1,
    },
});

const Overlay = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))",
    zIndex: 1,
});

const ContentContainer = styled(Container)(({ theme }) => ({
    position: "relative",
    height: "100%",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    animation: `${fadeIn} 1s ease-out`,
}));

const CTAButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: "12px 32px",
    fontSize: "1.2rem",
    backgroundColor: theme.palette.primary.main,
    color: "#000",
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: "white",
        transform: "scale(1.2)",
    },
}));

const images = [
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    "https://images.unsplash.com/photo-1509785307050-d4066910ec1e",
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf",
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e",
];

const CoffeeShopHero: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src =
            "https://images.unsplash.com/photo-1442512595331-e89e73853f31";
    };

    return (
        <HeroContainer role="banner" aria-label="Coffee Shop Hero Section">
            {images.map((img, index) => (
                <ImageSlide
                    key={index}
                    className={index === currentSlide ? "active" : ""}
                    sx={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <img
                        src={img}
                        alt={`Coffee shop ambiance ${index + 1}`}
                        style={{ display: "none" }}
                        onError={handleImageError}
                    />
                </ImageSlide>
            ))}
            <Overlay />
            <ContentContainer maxWidth="lg">
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: "2.5rem", md: "4rem" },
                        fontWeight: 700,
                        marginBottom: 2,
                        color: theme.palette.primary.main, // Updated to primary color
                    }}
                >
                    MyFein
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: "1.5rem", md: "2rem" },
                        fontWeight: 400,
                        marginBottom: 4,
                        color: theme.palette.primary.dark,
                    }}
                >
                    Where Every Cup Tells a Story
                </Typography>
                <Link to="/menu" style={{ textDecoration: "none" }}>
                    <CTAButton
                        variant="contained"
                        endIcon={<FiArrowRight />}
                        aria-label="Explore our menu"
                    >
                        Explore Our Menu
                    </CTAButton>
                </Link>
            </ContentContainer>
        </HeroContainer>
    );
};

export default CoffeeShopHero;
