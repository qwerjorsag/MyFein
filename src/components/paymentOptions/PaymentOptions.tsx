import React, { useEffect, useState } from "react";
import "./PaymentOptions.css";

interface PaymentOption {
    name: string;
    cost: number;
    image: string;
}

interface PaymentOptionSelectionProps {
    onChange: (name: string, cost: number) => void;
}

const PaymentOptionSelection: React.FC<PaymentOptionSelectionProps> = ({ onChange }) => {
    const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("");

    useEffect(() => {
        // Dynamically load payment options from JSON file
        import("../../data/paymentOptions.json")
            .then((data) => setPaymentOptions(data.default))
            .catch((err) => console.error("Error loading payment options:", err));
    }, []);

    const handleChange = (name: string, cost: number) => {
        setSelectedOption(name);
        onChange(name, cost);
    };

    return (
        <div className="payment-option-selection">
            {/*<h3>Vyberte způsob platby</h3>*/}
            {paymentOptions.map((option) => (
                <label key={option.name} className="payment-option">
                    <input
                        type="radio"
                        name="payment"
                        value={option.name}
                        checked={selectedOption === option.name}
                        onChange={() => handleChange(option.name, option.cost)}
                    />
                    <img src={option.image} alt={option.name} className="payment-option-image" />
                    <span>{option.name} ({option.cost} Kč)</span>
                </label>
            ))}
        </div>
    );
};

export default PaymentOptionSelection;
