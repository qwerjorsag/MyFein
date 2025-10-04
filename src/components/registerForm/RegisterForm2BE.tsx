import React, { useState } from "react";
import "./RegisterForm.css";
import { useNavigate, Link } from "react-router-dom"; // Import Link

const SignUp: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const nameRegex = /^[a-zA-Zá-žÁ-Ž]+$/;
    const postalCodeRegex = /^\d+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;



    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Validate First Name (optional, only letters)
        if (firstName && !nameRegex.test(firstName)) {
            newErrors.firstName = "Jméno může obsahovat pouze písmena.";
        }

        // Validate Last Name (optional, only letters)
        if (lastName && !nameRegex.test(lastName)) {
            newErrors.lastName = "Příjmení může obsahovat pouze písmena.";
        }

        // Validate Postal Code (optional, only numbers)
        if (postalCode && !postalCodeRegex.test(postalCode)) {
            newErrors.postalCode = "PSČ může obsahovat pouze čísla.";
        }

        // Validate Email (required)
        if (!email) {
            newErrors.email = "Email je povinný.";
        }

        // Validate Password (required)
        if (!password) {
            newErrors.password = "Heslo je povinné.";
        } else if (!passwordRegex.test(password)) {
            newErrors.password = "Heslo musí obsahovat alespoň 8 znaků, velké písmeno, malé písmeno a číslici.";
        }

        setErrors(newErrors);
        return newErrors;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

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

        validateForm();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            const formData = {
                firstName,
                lastName,
                address,
                city,
                postalCode,
                email,
                password,
            };

            fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message);
                    navigate("/login");

                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("There was an error submitting the form.");
                });
        }
    };

    const isFormInvalid = email === "" || password === "" || Object.keys(errors).length > 0;

    const handleOAuthReg = (provider: string) => {
        window.location.href = `http://localhost:5000/auth/${provider}`;
    };

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
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                    <div className="show-password">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label>Zobrazit heslo</label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="signup-button"
                    disabled={isFormInvalid}

                >
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
