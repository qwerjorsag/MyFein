import React, { useEffect } from "react";

interface PostalCodeProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

const PostalCodeFielld: React.FC<PostalCodeProps> = ({ value, onChange, error }) => {

    useEffect(() => {
        // Check for 'userEmail' in session storage
        const storedPostalCode = sessionStorage.getItem("userPostalCode");
        if (storedPostalCode) {
            onChange(storedPostalCode); // Set the initial value to the stored email
        }
    }, [onChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        onChange(input);
    };

    return (
        <div className="form-field">
            <label htmlFor="postal-code">PSČ</label>
            <input
                type="number"
                id="postal-code"
                value={value}
                onChange={handleChange}
                placeholder="Zadejte PSČ"
                required
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PostalCodeFielld;
