import React, { useEffect, useState } from "react";
import branchData from "../../data/branch.json"; // Direct import of the branch JSON file

interface Branch {
    shopname: string;
    size: string;
    address: string;
    foto: string;
}

interface BranchSelectionDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

const BranchSelectionDropdown: React.FC<BranchSelectionDropdownProps> = ({ value, onChange }) => {
    const [branches, setBranches] = useState<string[]>([]);

    useEffect(() => {
        // Extract only the shopname field from branch data
        const shopNames = branchData.map((branch) => branch.shopname);
        setBranches(shopNames);
    }, []);

    return (
        <div className="form-field">
            <label htmlFor="branch">Pobočka</label>
            <select id="branch" value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">Vyberte pobočku</option>
                {branches.map((shopname, index) => (
                    <option key={index} value={shopname}>
                        {shopname}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BranchSelectionDropdown;
