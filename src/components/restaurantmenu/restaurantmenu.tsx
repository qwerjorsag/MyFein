import React, { useState, useEffect } from 'react';
import menuData from '../../data/restaurantmenu.json';  // Import data from the JSON file
import { MenuItem, GroupedMenu } from '../../types/Types'; // Import the types
import "./RestaurantMenu.css"


const Menu: React.FC = () => {
    const [menu, setMenu] = useState<MenuItem[]>([]); // Define state type for menu

    // Function to group items by type
    const groupItemsByType = (data: MenuItem[]): GroupedMenu => {
        return data.reduce((acc: GroupedMenu, item: MenuItem) => {
            if (!acc[item.type]) {
                acc[item.type] = [];
            }
            acc[item.type].push(item);
            return acc;
        }, {});
    };

    useEffect(() => {
        // Set the menu data when the component mounts
        setMenu(menuData);
    }, []); // Empty dependency array to run only once when component mounts

    // Group menu items by type
    const groupedMenu = groupItemsByType(menu);

    return (
        <div className="menu-container">
            {Object.keys(groupedMenu).map((type) => (
                <div key={type} className="menu-category">
                    <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                    <ul className="menu-list">
                        {groupedMenu[type].map((item) => (
                            <li key={item.name} className="menu-item">
                                <span className="menu-item-name">{item.name}</span>
                                <span className="menu-item-price">{item.price} CZK</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Menu;
