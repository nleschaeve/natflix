import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);

    const cartCount = cartItems.length;

    const addToCart = (movie) => {
        const alreadyInCart = cartItems.some(item => item.id === movie.id);
        if (!alreadyInCart) {
            setCartItems([...cartItems, movie]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const toggleShow = () => {
        setShowCart(!showCart);
    };

    return (
        <CartContext.Provider value={{ cartItems, cartCount, showCart, addToCart, removeFromCart, toggleShow }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
