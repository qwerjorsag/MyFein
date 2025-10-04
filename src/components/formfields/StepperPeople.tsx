import React from "react";

interface NumberOfPersonsStepperProps {
    value: number;
    onChange: (value: number) => void;
}

const NumberOfPersonsStepper: React.FC<NumberOfPersonsStepperProps> = ({ value, onChange }) => {
    const increment = () => onChange(value + 1);
    const decrement = () => onChange(value > 1 ? value - 1 : 1);

    return (
        <div className="form-field">
            <label htmlFor="number-of-persons">Počet osob</label>
            <div className="stepper">
                <button type="button" onClick={decrement} disabled={value <= 1}>
                    −
                </button>
                <input
                    id="number-of-persons"
                    type="number"
                    min="1"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                />
                <button type="button" onClick={increment}>
                    +
                </button>
            </div>
        </div>
    );
};

export default NumberOfPersonsStepper;
