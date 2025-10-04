import React, { useState } from 'react';
import { useCart } from '../../context/Cart';
import './CartSummary.css';

const CartSummaryComponent: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
    const { cart, clearCart, getCartTotal } = useCart();
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={`cart-summary ${isVisible ? 'cart-summary--visible' : ''}`}>
            <div className="coffee-card__content">
                <button
                    className="cart-summary__toggle"
                    onClick={toggleVisibility}
                >
                    {isVisible ? '< Hide Summary' : 'Show Summary >'}
                </button>
                <h2 className="coffee-card__title">Cart Summary</h2>
                <div className="cart-summary__details">
                    <p className="coffee-card__text">
                        <span>Total Items:</span> {cart.reduce((total, item) => total + item.quantity, 0)}
                    </p>
                    <p className="coffee-card__text">
                        <span>Total:</span> {getCartTotal()},- CZK
                    </p>
                </div>
                <div className="cart-summary__actions">
                    <button
                        onClick={onCheckout}
                        className="coffee-card__button"
                    >
                        Checkout
                    </button>
                    <button
                        onClick={clearCart}
                        className="cart-summary__clear"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSummaryComponent;
