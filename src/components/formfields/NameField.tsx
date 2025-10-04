import React, {useEffect } from "react";

interface NameFieldProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

const NameField: React.FC<NameFieldProps> = ({ value, onChange, error }) => {

    useEffect(() => {
        // Check for 'userFirstName' in session storage
        const storedName = sessionStorage.getItem("userFirstName");
        if (storedName) {
            onChange(storedName); // Set the initial value to the stored name
        }
    }, [onChange]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value;

        // Allow only letters (including diacritics)
        input = input.replace(/[^a-zA-Zá-žÁ-Ž]/g, "");

        // Capitalize the first letter
        if (input.length > 0) {
            input = input.charAt(0).toUpperCase() + input.slice(1);
        }

        onChange(input);
    };

    return (
        <div className="form-field">
            <label htmlFor="firstName">Jméno</label>
            <input
                type="text"
                id="firstName"
                value={value}
                onChange={handleChange}
                placeholder="Zadejte své jméno"

            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default NameField;
