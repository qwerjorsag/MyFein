
// Cart.tsx
import React from 'react';
import { useCart } from '../../context/Cart';

const Cart: React.FC = () => {
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useCart();

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={`${item.id}-${item.weight}`} className="cart-item">
                            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>Weight: {item.weight}g</p>
                                <p>Price: {item.price} Kč</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Total: {getCartTotal()} Kč</h3>
            <button onClick={clearCart} className="clear-cart-button">
                Clear Cart
            </button>
        </div>
    );
};

export default Cart;