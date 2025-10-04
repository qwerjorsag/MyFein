import React, { useEffect } from "react";

interface AddressFieldProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

const AddressFielld: React.FC<AddressFieldProps> = ({ value, onChange, error }) => {

    useEffect(() => {
        // Check for 'userEmail' in session storage
        const storedAddress = sessionStorage.getItem("userAddress");
        if (storedAddress) {
            onChange(storedAddress); // Set the initial value to the stored email
        }
    }, [onChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        onChange(input);
    };

    return (
        <div className="form-field">
            <label htmlFor="address">Adresa a číslo popisné</label>
            <input
                type="address"
                id="address"
                value={value}
                onChange={handleChange}
                placeholder="Zadejte Vaši Adresu a Č.P."
                required
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AddressFielld;
