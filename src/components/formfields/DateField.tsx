import React from "react";

interface DateFieldProps {
    value: string;
    onChange: (value: string) => void;
}

const DateField: React.FC<DateFieldProps> = ({ value, onChange }) => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="form-field">
            <label htmlFor="date">Datum rezervace</label>
            <input
                id="date"
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
                min={today} // Set minimum date to today
            />
        </div>
    );
};

export default DateField;
