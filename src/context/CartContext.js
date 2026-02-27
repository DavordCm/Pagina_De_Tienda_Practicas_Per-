import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const addToCart = (game) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === game.id);
            if (existing) {
                return prev.map(i =>
                    i.id === game.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...game, quantity: 1 }];
        });
    };

    const removeFromCart = (gameId) => {
        setItems(prev => prev.filter(i => i.id !== gameId));
    };

    const getCount = () => items.reduce((sum, i) => sum + i.quantity, 0);

    const getTotal = () => items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, getCount, getTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
