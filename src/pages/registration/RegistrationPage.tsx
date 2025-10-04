import React from "react";
import SignUp from "../../components/registerForm/RegisterForm2BE";
import {Helmet} from "react-helmet"; // Import the SignUp form

const RegistrationPage: React.FC = () => {
    return (
        <div className="registration-page">

            <Helmet>
                <title>MyFein | Register </title>  {/* Assuming 'product' has a 'name' property */}
                <meta name="description"
                      content="MyFein, nejlepší káva online. Šálek kávy má být jednoduchý a rychlý."/>
                <meta name="keywords"
                      content="MyFein, káva online, objednávka kávy, nejlepší káva, nákup kávového příslušenství"/>
                <meta name="author" content="MyFein"/>
                <meta name="robots" content="index, follow"/>
            </Helmet>

            <SignUp /> {/* Include the SignUp component */}
        </div>
    );
};

export default RegistrationPage;
