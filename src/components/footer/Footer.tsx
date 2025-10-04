import React, { useState } from "react";
import { Box, Container, Grid2, Typography, Button, TextField, IconButton, styled } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import Newsletter from "../newsletter";

const FooterContainer = styled(Box)(({ theme }) => ({
    background: theme.palette.primary.dark,
    color: "#ffffff",
    padding: "64px 0",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
    marginTop: "1rem",
    // position: "relative",
    // top: "auto"
}));

const FooterTitle = styled(Typography)({
    fontWeight: 600,
    marginBottom: "24px",
    fontSize: "1.25rem"
});

const FooterLink = styled(Box)(({ theme }) => ({
    cursor: "pointer",
    marginBottom: "12px",
    transition: "color 0.3s ease",
    "&:hover": {
        color: theme.palette.primary.light,
        textDecoration: "underline"
    }
}));


const SocialIcon = styled(IconButton)(({ theme }) => ({
    color: "#ffffff",
    margin: "0 8px",
    transition: "transform 0.3s ease",
    "&:hover": {
        transform: "scale(1.2)",
        color: theme.palette.primary.light
    }
}));

const Footer = () => {
    const [email, setEmail] = useState("");



    return (
        <FooterContainer >
            <Container maxWidth="lg">
                <Grid2 container spacing={4}>
                    <Grid2 item xs={12} sm={6} md={3}>
                        <FooterTitle variant="h6">Company Overview</FooterTitle>
                        <Link
                            to={{
                                pathname: "/",
                                hash: "#about-us",
                            }}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <FooterLink variant="body2">About Us</FooterLink>
                        </Link>
                        <FooterLink variant="body2">Our Mission</FooterLink>

                        <Link
                            to={{
                                pathname: "/",
                                hash: "#team",
                            }}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <FooterLink variant="body2">Team</FooterLink>
                        </Link>

                        <FooterLink variant="body2">Careers</FooterLink>
                    </Grid2>

                    <Grid2 item xs={12} sm={6} md={2}>
                        <FooterTitle variant="h6">Product Features</FooterTitle>
                        <a href="/eshop" style={{textDecoration: "none", color: "inherit"}}>
                            <FooterLink variant="body2">E-shop</FooterLink>
                        </a>

                        <a href="/menu" style={{textDecoration: "none", color: "inherit"}}>
                            <FooterLink variant="body2">Menu</FooterLink>
                        </a>

                        {/*<FooterLink variant="body2">Integrations</FooterLink>*/}
                        {/*<FooterLink variant="body2">Pricing</FooterLink>*/}
                        {/*<FooterLink variant="body2">Updates</FooterLink>*/}
                    </Grid2>

                    <Grid2 item xs={12} sm={6} md={2}>
                        <FooterTitle variant="h6">Support & FAQ</FooterTitle>
                        {/*<FooterLink variant="body2">Help Center</FooterLink>*/}
                        {/*<FooterLink variant="body2">Documentation</FooterLink>*/}
                        <FooterLink variant="body2">Community</FooterLink>
                        <FooterLink variant="body2">Contact Us</FooterLink>
                    </Grid2>

                    <Grid2   item xs={12} sm={6} md={2}>
                        <FooterTitle variant="h6">Partners</FooterTitle>
                        <FooterLink variant="body2">Partner Program</FooterLink>
                        {/*<FooterLink variant="body2">Partner Portal</FooterLink>*/}
                        {/*<FooterLink variant="body2">Marketplace</FooterLink>*/}
                        {/*<FooterLink variant="body2">Case Studies</FooterLink>*/}
                    </Grid2>

                    <Grid2 item xs={12} md={3}>
                        <FooterTitle variant="h6">Stay Connected</FooterTitle>

                        <Box mt={3}>
                            <SocialIcon
                                aria-label="facebook"
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebook />
                            </SocialIcon>
                            <SocialIcon
                                aria-label="twitter"
                                href="https://www.twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaTwitter />
                            </SocialIcon>
                            <SocialIcon
                                aria-label="instagram"
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram />
                            </SocialIcon>
                            <SocialIcon
                                aria-label="linkedin"
                                href="https://www.linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin />
                            </SocialIcon>
                            <SocialIcon
                                aria-label="youtube"
                                href="https://www.youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaYoutube />
                            </SocialIcon>
                        </Box>
                    </Grid2>
                </Grid2>

                <Box mt={5} textAlign="center">
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                        © {new Date().getFullYear()} MyFein. This web was made ONLY FOR PORTFOLIO PURPOSES!
                    </Typography>
                </Box>
            </Container>
        </FooterContainer>
    );
};

export default Footer;