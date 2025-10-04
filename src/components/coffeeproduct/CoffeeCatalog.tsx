import React, { useContext } from 'react';
import './CoffeeCatalog.css';
import { CartProvider } from '../../context/Cart'; // Import CartContext
import coffeeCatalog from '../../data/coffeecatalog.json'; // Import coffee catalog data

interface CoffeeProduct {
    id: number;
    name: string;
    flavor: string;
    acidity: string;
    roastLevel: string;
    weights: { weight: number; price: number }[];
    imageUrl: string;
}

const CoffeeProductCard: React.FC<{ product: CoffeeProduct }> = ({ product }) => {
    const { addToCart } = useContext(CartProvider(addToCart));

    // Find the price for 250g or fallback if not available
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
                <button
                    className="coffee-card__button"
                    aria-label={`Add ${product.name} to cart`}
                    onClick={() => addToCart({ ...product, quantity: 1 })}
                >
                    Koupit
                </button>
            </div>
        </div>
    );
};

const CoffeeCatalog: React.FC = () => {
    return (
        <div className="coffee-catalog">
            {coffeeCatalog.map((product: CoffeeProduct) => (
                <CoffeeProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default CoffeeCatalog;
