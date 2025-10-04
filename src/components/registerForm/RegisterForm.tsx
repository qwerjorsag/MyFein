import React, { useState } from "react";
import "./RegisterForm.css";

const SignUp: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Validation rules
    const nameRegex = /^[a-zA-Zá-žÁ-Ž]+$/; // Only letters for first and last name
    const postalCodeRegex = /^\d+$/; // Only digits for postal code
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Password must contain a lowercase letter, uppercase letter, a number, and be at least 8 characters long

    // Validation function
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Validate First Name
        if (firstName && !nameRegex.test(firstName)) {
            newErrors.firstName = "Jméno může obsahovat pouze písmena.";
        }

        // Validate Last Name
        if (lastName && !nameRegex.test(lastName)) {
            newErrors.lastName = "Příjmení může obsahovat pouze písmena.";
        }

        // Validate Postal Code
        if (postalCode && !postalCodeRegex.test(postalCode)) {
            newErrors.postalCode = "PSČ může obsahovat pouze čísla.";
        }

        // Validate Email
        if (!email) {
            newErrors.email = "Email je povinný.";
        }

        // Validate Password (contains upper case, lower case, number, and at least 8 characters)
        if (!password) {
            newErrors.password = "Heslo je povinné.";
        } else if (!passwordRegex.test(password)) {
            newErrors.password = "Heslo musí obsahovat alespoň 8 znaků, velké písmeno, malé písmeno a číslici.";
        }

        setErrors(newErrors);
    };

    // Handle changes for each field and validate the form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        switch (id) {
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "address":
                setAddress(value);
                break;
            case "city":
                setCity(value);
                break;
            case "postalCode":
                setPostalCode(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }

        // Validate on each change
        validateForm();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Final validation before submission
        validateForm();

        // If there are no errors, submit the form
        if (Object.keys(errors).length === 0) {
            console.log("First Name:", firstName);
            console.log("Last Name:", lastName);
            console.log("Address:", address);
            console.log("City:", city);
            console.log("Postal Code:", postalCode);
            console.log("Email:", email);
            console.log("Password:", password);
        }
    };

    const handleOAuthReg = (provider: string) => {
        window.location.href = `http://localhost:5000/auth/${provider}`;


        return (
            <div className="signup-container">
                <h2 className="signup-title">Registrovat se</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-field">
                        <label htmlFor="firstName">Jméno</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={handleInputChange}
                        />
                        {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                    </div>

                    <div className="signup-field">
                        <label htmlFor="lastName">Příjmení</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={handleInputChange}
                        />
                        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                    </div>

                    <div className="signup-field">
                        <label htmlFor="address">Adresa</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="signup-field">
                        <label htmlFor="city">Město</label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="signup-field">
                        <label htmlFor="postalCode">PSČ</label>
                        <input
                            type="text"
                            id="postalCode"
                            value={postalCode}
                            onChange={handleInputChange}
                        />
                        {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
                    </div>

                    <div className="signup-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    <div className="signup-field">
                        <label htmlFor="password">Heslo</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>

                    <button type="submit" className="signup-button">
                        Registrovat
                    </button>
                    <div className="oauth-buttons">
                        <p className="text-center">Registrace pomocí</p>
                        <button
                            type="button"
                            className="oauth-button google-button"
                            onClick={() => handleOAuthReg("google")}
                        >
                            Registrovat se přes Google
                        </button>
                        <button
                            type="button"
                            className="oauth-button facebook-button"
                            onClick={() => handleOAuthReg("facebook")}
                        >
                            Registrovat se přes Facebook
                        </button>
                    </div>
                    {/* Login Link */}
                    <div className="signup-login">
                        <p>
                            Máte již účet?{" "}
                            <a href="/login" className="login-link">
                                Přihlásit se
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        );
    };

    export default SignUp;
}