import React from "react";

interface TimeDropdownProps {
    value: string;
    onChange: (value: string) => void;
}





const TimeDropdown: React.FC<TimeDropdownProps> = ({ value, onChange }) => {


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

    return (
        <div className="form-field">
            <label htmlFor="time">Čas</label>
            <select id="time" value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">Vyberte čas</option>
                {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>

                ))}
                required
            </select>
        </div>
    );
};

export default TimeDropdown;
