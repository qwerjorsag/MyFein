import React, { useEffect, useState } from "react";

// Define the type for the items in the cart
interface CartItem {
    id: number;
    name: string;
    quantity: number;
    selectedWeight: {
        weight: number;
        price: number;
    };
}

const PriceTable: React.FC = () => {
    const [items, setItems] = useState<CartItem[]>([]); // Explicitly set the type for items

    useEffect(() => {
        try {
            // Fetch data from localStorage using the key 'coffee-cart'
            const storedData = localStorage.getItem("coffee-cart");
            console.log("Stored Data:", storedData); // Debugging output
            if (storedData) {
                setItems(JSON.parse(storedData));
            } else {
                console.warn("No data found in localStorage for 'coffee-cart'.");
            }
        } catch (error) {
            console.error("Failed to parse localStorage data:", error);
        }
    }, []);

    return (
        <div>
            {/*<h1>Price Table</h1>*/}
            {items.length === 0 ? (
                <p>No data available. Please add items to the local storage with the key 'coffee-cart'.</p>
            ) : (
                <table style={{ width: "100%", textAlign: "left" }}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.selectedWeight.price} Kč</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PriceTable;
