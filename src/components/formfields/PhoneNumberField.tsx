import React, { useState } from "react";
import "../bookingform/BookingForm.css"; // Make sure your CSS is properly imported

const BookingForm: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Remove any non-numeric characters except the '+' sign
        value = value.replace(/[^\d+]/g, "");

        // Format the phone number (assuming the format is like +420 555 666 888)
        value = value.replace(/^(\+\d{3})(\d{1,3})(\d{1,3})(\d{1,3})$/, "$1 $2 $3 $4");

        setPhoneNumber(value);
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Simple validation for phone number format
        if (!phoneNumber || !/^\+?\d{3} \d{3} \d{3} \d{3}$/.test(phoneNumber)) {
            newErrors.phoneNumber = "Telefonní číslo musí být ve formátu +420 555 666 888.";
        }

        setErrors(newErrors);
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            // Handle form submission
            const formData = { phoneNumber };
            console.log(formData); // Example of sending form data
        }
    };

    return (


                <div className="form-field">
                    <label htmlFor="phoneNumber">Telefonní číslo</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        placeholder="+420 555 666 888"
                        onChange={handlePhoneNumberChange}

                    />
                    {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                </div>


    );
};

export default BookingForm;
