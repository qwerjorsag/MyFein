// src/contexts/CartContext.tsx trying to change
import React, { useState, useEffect, createContext, useContext } from 'react';
import { CoffeeProduct, WeightOption } from '../types/Coffee';

export interface CartItem extends CoffeeProduct {
    selectedWeight: WeightOption;
    quantity: number;
}

export interface CartContextType {
    cart: CartItem[];
    addToCart: (product: CoffeeProduct, selectedWeight: WeightOption) => void;
    removeFromCart: (productId: number, weightId: number) => void;
    updateQuantity: (productId: number, weightId: number, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
}

const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    getCartTotal: () => 0
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('coffee-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('coffee-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: CoffeeProduct, selectedWeight: WeightOption) => {
        setCart(currentCart => {
            // Check if item with same product and selected weight already exists
            const existingItemIndex = currentCart.findIndex(
                item => item.id === product.id && item.selectedWeight.weight === selectedWeight.weight
            );

            if (existingItemIndex > -1) {
                // Update quantity if the product with the selected weight exists
                const updatedCart = [...currentCart];
                updatedCart[existingItemIndex].quantity += 1;
                return updatedCart;
            }

            // Add the new product with the selected weight
            return [
                ...currentCart,
                {
                    ...product,
                    selectedWeight,
                    quantity: 1
                }
            ];
        });
    };

    const removeFromCart = (productId: number, weightId: number) => {
        setCart(currentCart =>
            currentCart.filter(
                item => !(item.id === productId && item.selectedWeight.weight === weightId)
            )
        );
    };

    const updateQuantity = (productId: number, weightId: number, quantity: number) => {
        setCart(currentCart =>
            currentCart.map(item =>
                item.id === productId && item.selectedWeight.weight === weightId
                    ? { ...item, quantity: Math.max(0, quantity) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.selectedWeight.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
