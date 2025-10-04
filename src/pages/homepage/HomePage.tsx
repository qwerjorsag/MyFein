import React from "react";
import ReviewCreator from "../../components/reviewCreator";
import {ReviewCarousel} from "../../components/reviewCard"
import {Typography} from "@mui/material";
import Hero from "../../components/hero"
import Chatbot from "../../components/chatbot";
import Team from "../../components/team"
import AboutUs from "../../components/aboutUs";
import BranchFotoCarousel from "../../components/branchFotoCarousel";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {Helmet} from "react-helmet"

interface HomeProps {
    user?: { firstName: string } | null;
}


const Home: React.FC<HomeProps> = ({user}) => {


    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({behavior: "smooth"});
            }
        }
    }, [location]);


    return (
        <>

            <Helmet>
                <title>MyFein | Home</title>
                <meta name="description"
                      content="MyFein, nejlepší káva online. Šálek kávy má být jednoduchý a rychlý."/>
                <meta name="keywords"
                      content="MyFein, káva online, objednávka kávy, nejlepší káva, nákup kávového příslušenství"/>
                <meta name="author" content="MyFein"/>
                <meta name="robots" content="index, follow"/>


            </Helmet>


            <Hero/>
            <AboutUs/>
            <Team/>
            <BranchFotoCarousel/>

            <Typography variant="h3">Customer Thoughts</Typography>
            <ReviewCarousel/>

            <Typography variant="h3">Your opinion matters!</Typography>
            <ReviewCreator/>

            {/*<Chatbot/>*/}

        </>


    );
};

export default Home;
