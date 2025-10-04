import React, { useEffect } from "react";

interface CityFieldProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

const CityFielld: React.FC<CityFieldProps> = ({ value, onChange, error }) => {

    useEffect(() => {
        // Check for 'userEmail' in session storage
        const storedCity = sessionStorage.getItem("userCity");
        if (storedCity) {
            onChange(storedCity); // Set the initial value to the stored email
        }
    }, [onChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        onChange(input);
    };

    return (
        <div className="form-field">
            <label htmlFor="city">Město</label>
            <input
                type="city"
                id="city"
                value={value}
                onChange={handleChange}
                placeholder="Zadejte Vaše Město"
                required
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default CityFielld;
