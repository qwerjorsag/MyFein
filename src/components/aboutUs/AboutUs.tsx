import React from "react";
import { Box, Container, Typography, Grid2, Paper, Card, CardContent, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { FaCoffee, FaLeaf, FaUsers, FaAward } from "react-icons/fa";

const StoryPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    margin: theme.spacing(2),
    backgroundColor: "#fff8f1"
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    margin: theme.spacing(2, 0),
    backgroundColor: "#fff8f1",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-evenly"

}));

const ValueCard = styled(Card)(({ theme }) => ({
    height: "100%",
    transition: "transform 0.3s",
    justifyContent: "center",
    "&:hover": {
        transform: "translateY(-10px)"
    }
}));

const AboutUs = () => {
    const values = [
        { icon: <FaCoffee />, title: "Quality", description: "Finest coffee beans sourced globally" },
        { icon: <FaLeaf />, title: "Sustainability", description: "Eco-friendly practices" },
        { icon: <FaUsers />, title: "Community", description: "Building connections through coffee" },
        { icon: <FaAward />, title: "Excellence", description: "Award-winning coffee experience" }
    ];

    return (
        <Box id="about-us">
            <Container maxWidth="lg">
                <StyledPaper
                    elevation={3}
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "flex-start", // Ensures content aligns to the top
                        py: 4,
                    }}
                >
                    {/* Text Section */}
                    <Box
                        sx={{
                            flex: 1,
                            mr: { md: 4 }, // Adds spacing to the right of the text on larger screens
                            mb: { xs: 3, md: 0 }, // Adds bottom margin on small screens
                        }}
                    >
                        <Typography variant="h3" gutterBottom sx={{marginBottom: "30px"}}>
                            Our Story
                        </Typography>
                        <Typography variant="body1">
                            Founded in 2015, MYFein Coffee has been dedicated to bringing the finest coffee experience to our community. We believe in the perfect balance between traditional craftsmanship and modern innovation.
                        </Typography>
                    </Box>

                    {/* Image Section */}
                    <Box
                        component="img"
                        src="https://images.unsplash.com/photo-1442512595331-e89e73853f31"
                        alt="Coffee brewing process"
                        sx={{
                            flex: 1,
                            width: { xs: "100%", md: "50%" },
                            height: "auto",
                            borderRadius: 2,
                        }}
                    />
                </StyledPaper>

                <Box sx={{ py: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {/* Title */}
                    <Typography variant="h2" gutterBottom align="center" marginBottom={4}>
                        Our Values
                    </Typography>

                    {/* Grid Container */}
                    <Grid2 container spacing={4} justifyContent="center">
                        {values.map((value, index) => (
                            <Grid2 item xs={12} sm={6} md={3} key={index}>
                                <ValueCard
                                    elevation={4}
                                    sx={{
                                        width: "100%", // Ensures consistent height
                                        minWidth: "260px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between", // Ensures content is spaced within the card
                                    }}
                                >
                                    <CardContent>
                                        <IconButton sx={{ fontSize: "2rem", color: "#8B4513" }}>
                                            {value.icon}
                                        </IconButton>
                                        <Typography variant="h5" gutterBottom>
                                            {value.title}
                                        </Typography>
                                        <Typography>{value.description}</Typography>
                                    </CardContent>
                                </ValueCard>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>


            </Container>
        </Box>



    );
};

export default AboutUs;