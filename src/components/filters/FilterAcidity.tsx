import React from 'react';

interface AcidityFilterProps {
    filter: string;
    setFilter: (filter: string) => void;
    acidityLevels: string[]; // Pass the unique acidity levels as a prop
}

const AcidityFilter: React.FC<AcidityFilterProps> = ({ filter, setFilter, acidityLevels }) => {
    return (
        <div className="filter">
            <p>Acidity</p>
            <label htmlFor="acidity-level"></label>
            <select
                id="acidity-level"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="All">All</option>
                {acidityLevels.map((acidity) => (
                    <option key={acidity} value={acidity}>
                        {acidity}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AcidityFilter;
