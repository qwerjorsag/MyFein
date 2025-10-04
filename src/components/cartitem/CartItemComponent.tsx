import React from 'react';
import { CartItem, useCart } from '../../context/Cart';
import { Trash2, Plus, Minus } from 'lucide-react';
import "./CartItem.css"

const CartItemComponent: React.FC<{ item: CartItem }> = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCart();

    return (
        <div className="cart-item" id="center">

            <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-item__image"
            />

            <div className="coffee-card__content">
                <h3 className="coffee-card__title">{item.name}</h3>
                <p className="coffee-card__text">
                    {item.selectedWeight.weight}g - ${item.selectedWeight.price.toFixed(2)}
                </p>
                <p className="coffee-card__text">
                    {item.roastLevel} | {item.flavor}
                </p>
                <div className="cart-item__actions">

                    <button
                        className="coffee-card__button"
                        onClick={() => updateQuantity(item.id, item.selectedWeight.weight, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        <Minus/>
                    </button>
                    <span className="cart-item__quantity">{item.quantity}</span>
                    <button
                        className="coffee-card__button"
                        onClick={() => updateQuantity(item.id, item.selectedWeight.weight, item.quantity + 1)}
                    >
                        <Plus/>
                    </button>


                </div>


            </div>

            <div>
                <button
                    className="coffee-card__button cart-item__remove"
                    onClick={() => removeFromCart(item.id, item.selectedWeight.weight)}
                >
                    <Trash2/>
                </button>
            </div>
        </div>
    );
};

export default CartItemComponent;
