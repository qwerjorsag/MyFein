import React, { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface PhoneInputComponentProps {
    value: string;
    onChange: (value: string) => void;
}

const PhoneInputComponent: React.FC<PhoneInputComponentProps> = ({ value, onChange }) => {
    const [error, setError] = useState<string | null>(null);

    const handleChange = (phone: string | undefined) => {
        if (phone) {
            if (isValidPhoneNumber(phone)
                // && phone.startsWith("+420")
            ) {
                setError(null);
            } else {
                setError("Neplatné telefonní číslo");
            }
        } else {
            setError("Telefonní číslo je povinné.");
        }
        onChange(phone || ""); // Send the updated value to the parent
    };

    return (
        <div className="form-field">
            <PhoneInput
                placeholder="Zadejte telefonní číslo"
                defaultCountry="CZ"
                international
                value={value}
                onChange={handleChange}
                required
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PhoneInputComponent;
