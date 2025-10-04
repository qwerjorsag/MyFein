import React, {useState} from "react";
import {
    NameField,
    LastNameField,
    TimeDropdown,
    PhoneNumFieldV2,
    BranchSelect,
    SliderPeople,
    StepperPeople,
    MessageField,
    DateField
} from "../formfields";
import {isValidPhoneNumber} from "react-phone-number-input";
import "./BookingForm.css";

const BookingForm: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [time, setTime] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [branch, setBranch] = useState("");
    const [people, setPeople] = useState<number>(1); // State for number of people
    const [message, setMessage] = useState("");
    const [date, setDate] = useState(""); // State for selected date
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!time) {
            newErrors.time = "Čas je povinný.";
        }

        if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
            newErrors.phoneNumber = "Neplatné telefonní číslo.";
        }

        if (!branch) {
            newErrors.branch = "Pobočka je povinná.";
        }

        if (!date) {
            newErrors.date = "Datum je povinné.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Do not submit if validation fails
        }

        const formData = {firstName, lastName, time, date, phoneNumber, branch, people, message};

        fetch("http://localhost:5000/api/booking", {
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
                alert("Rezervace byla úspěšně odeslána!");
                setFirstName("");
                setLastName("");
                setTime("");
                setDate(""); // Reset date field
                setPhoneNumber("");
                setBranch("");
                setPeople(1);
                setMessage(""); // Reset message field

                setErrors({});
            })
            .catch((error) => {
                console.error("Error submitting booking:", error);
                alert("Došlo k chybě při odesílání rezervace.");
            });
    };

    return (
        <div className="booking-form-container">

            <form className="booking-form" onSubmit={handleSubmit}>

                <NameField value={firstName} onChange={setFirstName}/>

                <LastNameField value={lastName} onChange={setLastName}/>

                <TimeDropdown value={time} onChange={setTime}/>
                {errors.time && <p className="error-message">{errors.time}</p>}

                <DateField value={date} onChange={setDate}/> {/* Add DateField here */}

                <BranchSelect value={branch} onChange={setBranch}/>
                {errors.branch && <p className="error-message">{errors.branch}</p>}

                <SliderPeople value={people} onChange={setPeople}/>

                {/*<StepperPeople value={people} onChange={setPeople}/>*/}

                <PhoneNumFieldV2 value={phoneNumber} onChange={setPhoneNumber}/>
                {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

                <MessageField value={message} onChange={setMessage}/>


                <button type="submit" className="submit-button">
                    Odeslat
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
