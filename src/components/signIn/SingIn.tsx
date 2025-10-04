import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignIn.css";

interface SignInProps {
    setUser: (user: { firstName: string }) => void;
}

const SignIn: React.FC<SignInProps> = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        /* Load Google's script dynamically */
        const loadGoogleScript = () => {
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.onload = initializeGoogleSignIn;
            document.body.appendChild(script);
        };

        const initializeGoogleSignIn = () => {
            /* Initialize the Google Sign-In button */
            if (window.google) {
                console.log("Google Client ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID);  // Ověřte hodnotu v konzoli
                window.google.accounts.id.initialize({
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // Hodnota z .env
                    callback: handleGoogleSignIn,
                });

                window.google.accounts.id.renderButton(
                    document.getElementById("google-signin-button"),
                    { theme: "outline", size: "large" } // Možnosti tlačítka
                );
            }


        };

        loadGoogleScript();
    }, []);

    const handleGoogleSignIn = async (response: any) => {
        try {
            const { credential } = response;

            // Send the tokenId (credential) to your backend for verification
            const result = await fetch("http://localhost:5000/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tokenId: credential }),  // Send the token to backend
            });

            const data = await result.json(); // Parse the JSON response

            if (result.ok) {
                // Store the user data in sessionStorage
                sessionStorage.setItem("userEmail", data.user.email);
                sessionStorage.setItem("userFirstName", data.user.firstName);
                sessionStorage.setItem("userLastName", data.user.lastName);
                sessionStorage.setItem("userPicture", data.user.picture);

                alert("Google login successful!");
                setUser(data.user); // Update the app state with user details
                sessionStorage.setItem("user", JSON.stringify(data.user));  // Optionally store the whole user object
                navigate("/");
            } else {
                setErrorMessage(data.message || "Google authentication failed.");
            }
        } catch (err) {
            console.error(err);
            setErrorMessage("An error occurred during Google authentication.");
        }
    };



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.firstName) {
                    sessionStorage.setItem("userId", data.id);
                    sessionStorage.setItem("userFirstName", data.firstName);
                    sessionStorage.setItem("userLastName", data.lastName);
                    sessionStorage.setItem("userAddress", data.address);
                    sessionStorage.setItem("userCity", data.city);
                    sessionStorage.setItem("userPostalCode", data.postalCode);
                    sessionStorage.setItem("userEmail", data.email);
                    sessionStorage.setItem("userRole", data.role);

                    alert("Login successful!");
                    navigate("/");
                    window.location.reload();
                } else {
                    setErrorMessage(data.message || "Invalid response from server.");
                }
            })
            .catch((error) => {
                setErrorMessage(error.message || "An error occurred during login.");
            });
    };
    console.log("Google Client ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID);

    return (
        <div className="signin-container">
            <h2 className="signin-title">Přihlásit se</h2>
            <form className="signin-form" onSubmit={handleSubmit}>
                <div className="signin-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="signin-field">
                    <label htmlFor="password">Heslo</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="signin-button">
                    Přihlásit se
                </button>
                <div className="oauth-buttons">
                    <p className="text-center">Nebo se přihlaste pomocí</p>
                    <div id="google-signin-button"></div> {/* Placeholder for the Google button */}
                </div>
                <div className="register-link">
                    <p>
                        Ještě nemáte účet? <br />
                        <Link to="/register" className="register-link-text">
                            Zaregistrovat se
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
