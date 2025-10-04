import React, { useState, useEffect } from "react";
import branchData from "../../data/branch.json"; // Adjust the path to your JSON file
import "./BookingForm.css";

interface Branch {
    id: number;
    name: string;
}

const BookingForm: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [branch, setBranch] = useState("");
    const [message, setMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");  // Add state for phone number
    const [branches, setBranches] = useState<Branch[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const nameRegex = /^[a-zA-Zá-žÁ-Ž]+$/;
    const phoneRegex = /^[\d+]+$/;  // Allow only numbers and the '+' symbol

    // Load branch data from local JSON file
    useEffect(() => {
        const loadedBranches = branchData.map((item, index) => ({
            id: index + 1, // Generate unique ID if not available
            name: item.shopname, // Extract shopname for the dropdown
        }));
        setBranches(loadedBranches);

        // Pre-fill fields from sessionStorage if available
        const storedFirstName = sessionStorage.getItem('userFirstName');
        const storedLastName = sessionStorage.getItem('userLastName');

        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setLastName(storedLastName);
    }, []); // Empty dependency array means this runs once when the component mounts

    // Generate time options
    const generateTimeOptions = () => {
        const times: string[] = [];
        const startHour = 9;
        const endHour = 17;

        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute of [0, 15, 30, 45]) {
                const timeString = `${hour.toString().padStart(2, "0")}:${minute
                    .toString()
                    .padStart(2, "0")}`;
                times.push(timeString);
            }
        }

        return times;
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!firstName || !nameRegex.test(firstName)) {
            newErrors.firstName = "Jméno může obsahovat pouze písmena.";
        }
        if (!lastName || !nameRegex.test(lastName)) {
            newErrors.lastName = "Příjmení může obsahovat pouze písmena.";
        }
        if (!date) {
            newErrors.date = "Datum je povinné.";
        }
        if (!time) {
            newErrors.time = "Čas je povinný.";
        }
        if (!branch) {
            newErrors.branch = "Pobočka je povinná.";
        }
        if (!phoneNumber || !phoneRegex.test(phoneNumber)) { // Validate phone number
            newErrors.phoneNumber = "Telefonní číslo může obsahovat pouze číslice a symbol '+'.";
        }

        setErrors(newErrors);
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            const formData = {
                firstName,
                lastName,
                date,
                time,
                branch,
                message,
                phoneNumber,  // Include phone number in form data
            };

            // Update the fetch URL to send data to your backend server
            fetch("http://localhost:5000/api/booking", {  // Update URL to match your backend endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    alert(data.message || "Booking submitted successfully!");
                })
                .catch((error) => {
                    console.error("Error submitting booking:", error);
                    alert("There was an error submitting the booking.");
                });
        }
    };

    return (
        <div className="booking-form-container">
            <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="firstName">Jméno</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                </div>

                <div className="form-field">
                    <label htmlFor="lastName">Příjmení</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                </div>

                <div className="form-field">
                    <label htmlFor="phoneNumber">Telefonní číslo</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        placeholder="+420 555 666 888"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                </div>

                <div className="form-field">
                    <label htmlFor="date">Datum</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    {errors.date && <p className="error-message">{errors.date}</p>}
                </div>

                <div className="form-field">
                    <label htmlFor="time">Čas</label>
                    <select id="time" value={time} onChange={(e) => setTime(e.target.value)}>
                        <option value="">Vyberte čas</option>
                        {generateTimeOptions().map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                    {errors.time && <p className="error-message">{errors.time}</p>}
                </div>

                <div className="form-field">
                    <label htmlFor="branch">Pobočka</label>
                    <select id="branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
                        <option value="">Vyberte pobočku</option>
                        {branches.map((branch) => (
                            <option key={branch.id} value={branch.name}>
                                {branch.name}
                            </option>
                        ))}
                    </select>
                    {errors.branch && <p className="error-message">{errors.branch}</p>}
                </div>

                <div className="form-field">
                    <label htmlFor="message" >Zpráva</label>
                    <textarea
                        id="message"
                        value={message}
                        placeholder="Zadejte dodatečné informace k rezervaci"

                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit" className="submit-button">
                    Odeslat
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
