import React, { useEffect } from "react";

interface EmailFieldProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

const EmailField: React.FC<EmailFieldProps> = ({ value, onChange, error }) => {

    useEffect(() => {
        // Check for 'userEmail' in session storage
        const storedEmail = sessionStorage.getItem("userEmail");
        if (storedEmail) {
            onChange(storedEmail); // Set the initial value to the stored email
        }
    }, [onChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        onChange(input);
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleBlur = () => {
        // Check if the email is valid
        if (value && !isValidEmail(value)) {
            alert("Please enter a valid email address.");
        }
    };

    return (
        <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                required
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default EmailField;
