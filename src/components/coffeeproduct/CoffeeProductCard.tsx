import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CoffeeCatalog.css';
import { useCart } from '../../context/Cart'; // Import CartContext

interface CoffeeProduct {
    id: number;
    name: string;
    flavor: string;
    acidity: string;
    roastLevel: string;
    weights: { weight: number; price: number }[];
    imageUrl: string;
}

interface CoffeeProductCardProps {
    product: CoffeeProduct;
}

const CoffeeProductCard: React.FC<CoffeeProductCardProps> = ({ product }) => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('CoffeeProductCard must be used within a CartProvider');
    }

    const { addToCart } = cartContext;

    const price250 = product.weights.find((w) => w.weight === 250)?.price || 'N/A';

    return (
        <div className="coffee-card">
            <div className="coffee-card__media">
                <img src={product.imageUrl} alt={`${product.name} coffee`} />
            </div>
            <div className="coffee-card__content">
                <h2 className="coffee-card__title">{product.name}</h2>
                <p className="coffee-card__text">
                    <strong>Flavor:</strong> {product.flavor}
                </p>
                <p className="coffee-card__text">
                    <strong>Acidity:</strong> {product.acidity}
                </p>
                <p className="coffee-card__text">
                    <strong>Roast Level:</strong> {product.roastLevel}
                </p>
                <p className="coffee-card__price">
                    <strong>Price (250g):</strong> {price250} Kč
                </p>

                {/* Link to the product detail page */}
                <Link to={`/coffee/:coffeeName`} className="coffee-card__details-link">
                    View Details
                </Link>

                <button
                    className="coffee-card__button"
                    aria-label={`Add ${product.name} to cart`}
                    onClick={() => addToCart({ ...product, quantity: 1 })} // Add product to cart
                >
                    Koupit
                </button>
            </div>
        </div>
    );
};

export default CoffeeProductCard;
