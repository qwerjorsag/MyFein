// src/components/ProductDetails.tsx
import React, { useState } from 'react';
import { Coffee, WeightOption } from '../../types/Coffee';
import { useCart } from '../../context/Cart'; // Import the cart context
import './ProductDetails.css';

type ProductDetailsProps = {
    product: Coffee;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { addToCart } = useCart(); // Use the addToCart function from the context
    const [selectedWeightIndex, setSelectedWeightIndex] = useState(0); // Track selected weight
    const [isAddedToCart, setIsAddedToCart] = useState(false); // Track if item is added to cart

    // Get the currently selected weight option
    const selectedWeight = product.weights[selectedWeightIndex];

    // Handle weight selection
    const handleWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedWeightIndex(parseInt(e.target.value, 10));
        setIsAddedToCart(false); // Reset button state
    };

    // Handle Add to Cart action
    const handleAddToCart = () => {
        if (!isAddedToCart) {
            addToCart(product, selectedWeight); // Add item to cart
            setIsAddedToCart(true); // Disable button
        }
    };

    return (
        <div className="product-details">
            <h1>{product.name}</h1>

            <div className="product-details__info">
                <img src={`/${product.imageUrl}`} alt={product.name} />
                <p>{product.description}</p>
                <p>
                    <strong>Origin:</strong> {product.origin}, {product.region}
                </p>
                <p>
                    <strong>Producer:</strong> {product.producer}
                </p>
                <p>
                    <strong>Altitude:</strong> {product.altitude}
                </p>
                <p>
                    <strong>Variety:</strong> {product.variety}
                </p>
                <p>
                    <strong>Process:</strong> {product.process}
                </p>
                <p>
                    <strong>Roast Level:</strong> {product.roastLevel}
                </p>
                <p>
                    <strong>Aroma:</strong> {product.aroma}
                </p>
                <p>
                    <strong>Flavor:</strong> {product.flavor}
                </p>
                <p>
                    <strong>Aftertaste:</strong> {product.aftertaste}
                </p>
                <p>
                    <strong>Acidity:</strong> {product.acidity}
                </p>
                <p>
                    <strong>Body:</strong> {product.body}
                </p>

                <div className="weights">
                    <h3>Available Weights:</h3>
                    <select
                        value={selectedWeightIndex}
                        onChange={handleWeightChange}
                        className="product-details__dropdown"
                    >
                        {product.weights.map((weight, index) => (
                            <option key={weight.weight} value={index}>
                                {weight.weight}g - {weight.price} CZK
                            </option>
                        ))}
                    </select>
                </div>

                <p>
                    <strong>In Stock:</strong> {product.inStock ? '✅' : '❌'}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="product-details__button"
                    disabled={isAddedToCart || !product.inStock}
                >
                    {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
