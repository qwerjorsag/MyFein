import React from "react";
// import "./Slider.css"


interface NumberOfPersonsSliderProps {
    value: number;
    onChange: (value: number) => void;
}

const NumberOfPersonsSlider: React.FC<NumberOfPersonsSliderProps> = ({ value, onChange }) => {
    return (
        <div className="form-field">
            <label htmlFor="people">Počet osob</label>
            <input
                id="people"
                type="range"
                min="1"
                max="10"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />
            <span>{value} osob</span>
        </div>
    );
};

export default NumberOfPersonsSlider;
