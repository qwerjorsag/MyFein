import React from "react";
import BookingForm from "../../components/bookingform/BookingFormV2";
import "./BookingPage.css";
import {Helmet} from "react-helmet";

const BookingPage: React.FC = () => {
    return (
        <div className="booking-page-container">
            <Helmet>
                <title>MyFein | Booking</title>  {/* Assuming 'product' has a 'name' property */}
                <meta name="description"
                      content="MyFein, nejlepší káva online. Šálek kávy má být jednoduchý a rychlý."/>
                <meta name="keywords"
                      content="MyFein, káva online, objednávka kávy, nejlepší káva, nákup kávového příslušenství"/>
                <meta name="author" content="MyFein"/>
                <meta name="robots" content="index, follow"/>
            </Helmet>

            <h1 className="booking-page-title">Rezervace</h1>
            <p className="booking-page-description">
                Vyplňte níže uvedený formulář a rezervujte si termín.
            </p>
            <BookingForm />
        </div>
    );
};

export default BookingPage;
