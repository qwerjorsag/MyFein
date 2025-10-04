import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { CoffeeProduct, WeightOption } from '../../types/Coffee';
import "./CoffeeCardItem.css";

type CoffeeCardProps = {
    product: CoffeeProduct;
    selectedWeightIndex: number;
    onWeightSelect: (productId: number, weightIndex: number) => void;
    onAddToCart: (product: CoffeeProduct, selectedWeight: WeightOption) => void;
};

const CoffeeCard: React.FC<CoffeeCardProps> = ({ product, selectedWeightIndex, onWeightSelect, onAddToCart }) => {
    const [isAddedToCart, setIsAddedToCart] = useState(false);  // State to track if item is added to cart
    const selectedWeight = product.weights[selectedWeightIndex]; // Get selected weight from the index

    // Function to handle the weight selection
    const handleWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const weightIndex = parseInt(e.target.value, 10);
        onWeightSelect(product.id, weightIndex);  // Update the selected weight in parent
        setIsAddedToCart(false);  // Reset the button state when weight changes
    };

    // Function to handle Add to Cart action
    const handleAddToCart = () => {
        if (!isAddedToCart) {
            onAddToCart(product, selectedWeight);  // Add item to cart
            setIsAddedToCart(true);  // Disable further clicks
        }
    };

    return (
        <div className="coffee-card">
            <div className="coffee-card__media">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                />
            </div>
            <div className="coffee-card__content">
                <h2 className="coffee-card__title">{product.name}</h2>
                <p className="coffee-card__text">
                    {product.roastLevel} | {product.flavor}
                </p>

                <div className="coffee-card__select">
                    <label htmlFor={`weight-select-${product.id}`}></label>
                    <select
                        id={`weight-select-${product.id}`}
                        value={selectedWeightIndex}
                        onChange={handleWeightChange}  // Use the new weight change handler
                        className="coffee-card__dropdown"
                    >
                        {product.weights.map((weight, index) => (
                            <option key={weight.weight} value={index}>
                                {weight.weight}g - {weight.price} CZK
                            </option>
                        ))}
                    </select>
                </div>

                {/* Add Link to product details */}
                <Link to={`/coffee/${product.id}`} className="coffee-card__details-link">
                    View Details
                </Link>

                <button
                    onClick={handleAddToCart}  // Use the function that handles Add to Cart
                    className="coffee-card__button"
                    disabled={isAddedToCart || !product.inStock}  // Disable button if item is already in cart or out of stock
                >
                    {!product.inStock ? 'Out of Stock' : isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
                </button>

            </div>
        </div>
    );
};

export default CoffeeCard;
