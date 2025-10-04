// src/components/CartPage.tsx
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useCart } from '../../context/Cart';
import CartItemComponent from "../../components/cartitem/CartItemComponent";
import CartSummaryComponent from "../../components/cartsummary/CartSummary";
import "./CartPage.css"
import {Helmet} from "react-helmet";

const CartPage: React.FC = () => {
    const { cart } = useCart();

    const navigate = useNavigate();


    const handleCheckout = () => {
        // Implement checkout logic

        navigate('/checkout');

        alert('Proceeding to checkout');

    };

    if (cart.length === 0) {
        return (
            <div>
                <Helmet>
                    <title>MyFein | Cart is empty :( </title>  {/* Assuming 'product' has a 'name' property */}
                    <meta name="description"
                          content="MyFein, nejlepší káva online. Šálek kávy má být jednoduchý a rychlý."/>
                    <meta name="keywords"
                          content="MyFein, káva online, objednávka kávy, nejlepší káva, nákup kávového příslušenství"/>
                    <meta name="author" content="MyFein"/>
                    <meta name="robots" content="index, follow"/>
                </Helmet>
                <h2 className="coffee-card__title">Your Cart Is Empty :(</h2>
                <p className="coffee-card__text">Explore our coffee selection and add some to your cart!</p>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>MyFein | Cart </title>  {/* Assuming 'product' has a 'name' property */}
                <meta name="description"
                      content="MyFein, nejlepší káva online. Šálek kávy má být jednoduchý a rychlý."/>
                <meta name="keywords"
                      content="MyFein, káva online, objednávka kávy, nejlepší káva, nákup kávového příslušenství"/>
                <meta name="author" content="MyFein"/>
                <meta name="robots" content="index, follow"/>
            </Helmet>

            <h1 className="coffee-card__title">Your Coffee Cart</h1>

                <div className="cart-items">
                    {cart.map(item => (
                        <CartItemComponent key={`${item.id}-${item.selectedWeight.weight}`} item={item} />
                    ))}
                </div>

                <div className="checkout">
                <CartSummaryComponent onCheckout={handleCheckout} />
                </div>


        </div>
    );
};

export default CartPage;
