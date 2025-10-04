import React from "react";
import { Box, Card, CardContent, CardMedia, Container, Grid2, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import teamData from "../../data/team.json"; // Import team data from JSON

const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    width: "350px",
    display: "flex",
    margin: "0 auto",
    justifyContent: "center",
    flexDirection: "column",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)"
    }
}));

const CircularImage = styled(CardMedia)({
    width: 160,
    height: 160,
    borderRadius: "50%",
    margin: "20px auto",
    objectFit: "cover"
});

const SocialIcons = styled(Box)({
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "auto",
    padding: "16px"
});

const TeamMembers = () => {
    return (
        <Box id="team" sx={{ py: 5, backgroundColor: "#f5f5f5"}}>
            <Container maxWidth="lg">
                <Typography
                    variant="h2"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        mb: 1
                    }}
                >
                    Our Team
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 6 }}
                >
                    Meet the talented individuals behind our success
                </Typography>

                <Grid2 container spacing={4} justifyContent="center" alignItems="center">
                    {teamData.map((member, index) => (
                        <Grid2 item xs={12} sm={6} md={4} lg={3} key={index} display="flex" justifyContent="center">
                            <StyledCard>
                                <CircularImage
                                    component="img"
                                    image={member.image}
                                    alt={member.name}
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
                                    }}
                                />
                                <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {member.name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="primary"
                                        gutterBottom
                                    >
                                        {member.position}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        {member.description}
                                    </Typography>
                                </CardContent>
                                <SocialIcons>
                                    <IconButton
                                        aria-label="linkedin"
                                        color="primary"
                                        href={member.social.linkedin}
                                    >
                                        <FaLinkedin />
                                    </IconButton>
                                    <IconButton
                                        aria-label="twitter"
                                        color="primary"
                                        href={member.social.twitter}
                                    >
                                        <FaTwitter />
                                    </IconButton>
                                    {/*<IconButton*/}
                                    {/*    aria-label="github"*/}
                                    {/*    color="primary"*/}
                                    {/*    href={member.social.github}*/}
                                    {/*>*/}
                                    {/*    <FaGithub />*/}
                                    {/*</IconButton>*/}
                                </SocialIcons>
                            </StyledCard>
                        </Grid2>
                    ))}
                </Grid2>

            </Container>
        </Box>
    );
};

export default TeamMembers;
