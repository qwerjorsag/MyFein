import React, { useEffect, useState } from "react";
import deliveryhData from "../../data/deliveryMerhod.json"; // Import delivery method data
import { BranchSelect } from "../formfields";

interface Delivery {
    name: string;
    price: number;
}

interface DeliverySelectionDropdownProps {
    value: string;
    onChange: (value: string, price: number) => void;
    onBranchChange: (branch: string) => void; // Add callback for branch updates
}

const DeliverySelectionDropdown: React.FC<DeliverySelectionDropdownProps> = ({
                                                                                 value,
                                                                                 onChange,
                                                                                 onBranchChange,
                                                                             }) => {
    const [deliveryOptions, setDeliveryOptions] = useState<Delivery[]>([]);
    const [branch, setBranch] = useState("");
    const [error, setError] = useState<string>("");
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);

    useEffect(() => {
        // Load delivery data
        setDeliveryOptions(deliveryhData);
    }, []);

    const handleChange = (selectedName: string) => {
        const selectedOption = deliveryOptions.find(
            (delivery) => delivery.name === selectedName
        );

        const price = selectedOption ? selectedOption.price : 0;
        setDeliveryPrice(price); // Update delivery price
        onChange(selectedName, price);

        // Reset branch if delivery method changes
        if (selectedName !== "Vyzvednutí na prodejně") {
            setBranch(""); // Reset branch state
            onBranchChange(""); // Notify parent to reset branch
        }

        // Validation: Check if a valid option is selected
        if (selectedName === "delivery") {
            setError("Prosím, vyberte způsob dopravy.");
        } else {
            setError(""); // Clear error
        }
    };

    const handleBranchChange = (selectedBranch: string) => {
        setBranch(selectedBranch); // Update local branch state
        onBranchChange(selectedBranch); // Propagate branch change to parent
    };

    return (
        <div className="form-field">
            <label htmlFor="delivery">Doprava</label>
            <select
                id="delivery"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                aria-invalid={!!error}
            >
                <option value="delivery">Vyberte způsob dopravy</option>
                {deliveryOptions.map((delivery, index) => (
                    <option key={index} value={delivery.name}>
                        {delivery.name}
                    </option>
                ))}
            </select>
            <p>Cena dopravy: {deliveryPrice} Kč</p> {/* Display delivery price */}
            {error && <p className="error-message">{error}</p>}

            {value === "Vyzvednutí na prodejně" && (
                <BranchSelect value={branch} onChange={handleBranchChange} />
            )}
        </div>
    );
};

export default DeliverySelectionDropdown;
