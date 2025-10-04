import React from 'react';

interface FilterProps {
    selectedRoastLevels: string[];
    setSelectedRoastLevels: (roastLevels: string[]) => void;
    roastLevels: string[]; // The available roast levels from JSON
}

const Filter: React.FC<FilterProps> = ({ selectedRoastLevels, setSelectedRoastLevels, roastLevels }) => {
    // Define the desired order explicitly
    const desiredOrder = ['Light', 'Medium', 'Dark'];

    // Sort roast levels to match the desired order
    const sortedRoastLevels = desiredOrder.filter((roast) => roastLevels.includes(roast));

    const handleRadioChange = (roastLevel: string) => {
        if (roastLevel === 'all') {
            setSelectedRoastLevels([]); // Clear all selections when "All Products" is selected
        } else {
            setSelectedRoastLevels([roastLevel]); // Select only one roast level
        }
    };

    return (
        <div className="filter">
            <p>Roast</p>

            <div className="radio-group">
                {/* "All Products" option */}
                <label key="all" className="radio-label">
                    <input
                        type="radio"
                        value="all"
                        checked={selectedRoastLevels.length === 0}
                        onChange={() => handleRadioChange('all')}
                    />
                    All Products
                </label>

                {/* Display sorted roast levels */}
                {sortedRoastLevels.map((roast) => (
                    <label key={roast} className="radio-label">
                        <input
                            type="radio"
                            value={roast}
                            checked={selectedRoastLevels.includes(roast)}
                            onChange={() => handleRadioChange(roast)}
                        />
                        {roast}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Filter;
