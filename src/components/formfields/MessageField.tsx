import React from "react";

interface MessageFieldProps {
    value: string;
    onChange: (value: string) => void;
}

const MessageField: React.FC<MessageFieldProps> = ({ value, onChange }) => {
    return (
        <div className="form-field">
            <label htmlFor="message">Zpráva</label>
            <textarea
                id="message"
                value={value}
                placeholder="Zadejte dodatečné informace k rezervaci"
                onChange={(e) => onChange(e.target.value)}
            ></textarea>
        </div>
    );
};

export default MessageField;
