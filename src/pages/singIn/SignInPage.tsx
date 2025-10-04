
import React , {useState} from "react";
import SignIn from "../../components/signIn/SingIn";
import {Helmet} from "react-helmet"; // Import SignIn component
// import "./SignInPage.css"; // Import page-specific styles

const SignInPage: React.FC = () => {
    const [user, setUser] = useState<{ firstName: string } | null>(null);
    return (
        <div className="signin-page">

            <Helmet>
                <title>MyFein | Sign In</title>
                <meta name="description"
                      content="MyFein, nejlepší káva online. Šálek kávy má být jednoduchý a rychlý."/>
                <meta name="keywords"
                      content="MyFein, káva online, objednávka kávy, nejlepší káva, nákup kávového příslušenství"/>
                <meta name="author" content="MyFein"/>
                <meta name="robots" content="index, follow"/>


            </Helmet>

            <div className="signin-page-content">
                <SignIn setUser={setUser} />
            </div>
        </div>
    );
};

export default SignInPage;
