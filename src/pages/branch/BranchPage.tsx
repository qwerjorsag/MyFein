import React, { useState, useEffect } from "react";
import BranchItem from "../../components/branchitem/BranchItem";
import branchData from "../../data/branch.json"; // Direct import of the JSON data
import "./BranchPage.css";
import {Helmet} from "react-helmet";

interface Branch {
    shopname: string;
    size: string;
    address: string;
    foto: string;
    city: string;
}

const BranchPage: React.FC = () => {
    const [filterSize, setFilterSize] = useState<string>("");
    const [filterCity, setFilterCity] = useState<string>("");

    // Initial filtered branches are the entire branchData
    const [filteredBranches, setFilteredBranches] = useState<Branch[]>(branchData);

    // Extract unique sizes and cities dynamically from branch data
    const sizes = Array.from(new Set(branchData.map((branch) => branch.size)));
    const cities = Array.from(new Set(branchData.map((branch) => branch.city)));

    useEffect(() => {
        // Filter branches when filterSize or filterCity changes
        const newFilteredBranches = branchData.filter((branch) => {
            const sizeMatch = filterSize ? branch.size === filterSize : true;
            const cityMatch = filterCity ? branch.city === filterCity : true;
            return sizeMatch && cityMatch;
        });

        setFilteredBranches(newFilteredBranches);
    }, [filterSize, filterCity]); // Run this effect when either filter changes

    return (
        <div className="branch-page">

            <Helmet>
                <title>MyFein | Branches </title>  {/* Assuming 'product' has a 'name' property */}
                <meta name="description"
                      content="MyFein, nejlepší káva online. Šálek kávy má být jednoduchý a rychlý."/>
                <meta name="keywords"
                      content="MyFein, káva online, objednávka kávy, nejlepší káva, nákup kávového příslušenství"/>
                <meta name="author" content="MyFein"/>
                <meta name="robots" content="index, follow"/>
            </Helmet>

            <div className="filter-container">
                <label htmlFor="size-filter">Velikost: </label>
                <select
                    id="size-filter"
                    value={filterSize}
                    onChange={(e) => setFilterSize(e.target.value)}
                >
                    <option value="">All</option>
                    {sizes.map((size) => (
                        <option key={size} value={size}>
                            {size.charAt(0).toUpperCase() + size.slice(1)} {/* Capitalize first letter */}
                        </option>
                    ))}
                </select>



                <label htmlFor="city-filter">Město: </label>
                <select
                    id="city-filter"
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value)}
                >
                    <option value="">All</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city} {/* Display city name */}
                        </option>
                    ))}
                </select>
            </div>

            <div className="branch-list">
                {filteredBranches.map((branch, index) => (
                    <BranchItem
                        key={index}
                        shopname={branch.shopname}
                        size={branch.size}
                        address={branch.address}
                        foto={branch.foto}
                        city={branch.city}
                    />
                ))}
            </div>
        </div>
    );
};

export default BranchPage;
