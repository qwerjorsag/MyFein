import React from "react";
import CheckoutForm from "../../components/checkoutform/CheckoutForm";
import {Typography} from "@mui/material";
import { Helmet } from "react-helmet";
import "../bookingUser/BookingPage.css";

const CheckoutPage: React.FC = () => {
    return (
        <div className="booking-page-container">

            <Helmet>
                {/* Základní meta tagy */}
                <title>MyFein  | Checkout</title>
                <meta name="description" content="Dokončete objednávku vaší oblíbené kávy a kávového příslušenství u MyFein. Jednoduchý a rychlý checkout proces." />
                <meta name="keywords" content="MyFein, checkout, káva online, objednávka kávy, nejlepší káva, nákup kávového příslušenství" />
                <meta name="author" content="MyFein" />
                <meta name="robots" content="index, follow" />


            </Helmet>

            <Typography variant="h1">Objednávka</Typography>

            <Typography variant="body1" sx={{ margin: "1rem" }} >Vyplňte níže uvedený formulář a rezervujte si termín.</Typography>
            {/*<p className="booking-page-description">*/}
            {/*    Vyplňte níže uvedený formulář a rezervujte si termín.*/}
            {/*</p>*/}
            <CheckoutForm />
        </div>
    );
};

export default CheckoutPage;
