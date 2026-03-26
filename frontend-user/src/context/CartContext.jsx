import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "cart";
const RENTALS_STORAGE_KEY = "rentals";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Todo : Chargez et initialisez le panier et les locations
  useEffect(() => {
    try {
      const storedCart = JSON.parse(
        localStorage.getItem(CART_STORAGE_KEY) || "[]",
      );
      const storedRentals = JSON.parse(
        localStorage.getItem(RENTALS_STORAGE_KEY) || "[]",
      );

      setCart(Array.isArray(storedCart) ? storedCart : []);
      setRentals(Array.isArray(storedRentals) ? storedRentals : []);
    } catch {
      setCart([]);
      setRentals([]);
    }
  }, []);

  // Todo : Sauvegardez le panier et les locations a chaque modif
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    localStorage.setItem(RENTALS_STORAGE_KEY, JSON.stringify(rentals));
  }, [cart, rentals]);

  // Ajouter au panier
  const addToCart = (movie) => {
    if (!movie?.id) {
      return;
    }

    if (isInCart(movie.id) || isRented(movie.id)) {
      return;
    }

    setCart((prevCart) => [...prevCart, movie]);
  };

  // Retirer du panier
  const removeFromCart = (movieId) => {
    setCart((prevCart) => prevCart.filter((movie) => movie.id !== movieId));
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Calculer le total
  const getCartTotal = () => {
    return cart.reduce((total, movie) => total + Number(movie.price || 0), 0);
  };

  // Nombre d'items
  const getCartCount = () => {
    return cart.length;
  };

  // Louer un film
  const rentMovie = (movie) => {
    if (!movie?.id || isRented(movie.id)) {
      return { success: false, error: "Film deja loue" };
    }

    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 jours

    const rental = {
      id: Date.now(),
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      genre: movie.genre,
      year: movie.year,
      duration: movie.duration,
      rating: movie.rating,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
    };

    // Todo : Mettre a jour la liste des films loues
    setRentals((prevRentals) => [...prevRentals, rental]);

    // Supprimer le film du panier
    removeFromCart(movie.id);

    return { success: true, rental };
  };

  // Louer tous les films du panier
  const rentAllInCart = () => {
    const now = new Date();
    const newRentals = cart
      .filter((movie) => !isRented(movie.id))
      .map((movie, index) => {
        const rentalDate = new Date(now);
        const expiryDate = new Date(now);
        expiryDate.setDate(expiryDate.getDate() + 7);

        return {
          id: Date.now() + index,
          movieId: movie.id,
          title: movie.title,
          poster: movie.poster,
          price: movie.price,
          genre: movie.genre,
          year: movie.year,
          duration: movie.duration,
          rating: movie.rating,
          rentalDate: rentalDate.toISOString(),
          expiryDate: expiryDate.toISOString(),
        };
      });

    // Todo : XXX
    setRentals((prevRentals) => [...prevRentals, ...newRentals]);

    // Todo : vider le panier
    clearCart();

    return { success: true, count: newRentals.length };
  };

  // Verifier si un film est loue
  const isRented = (movieId) => {
    return rentals.some(
      (rental) => rental.movieId === movieId || rental.id === movieId,
    );
  };

  // Obtenir la location d'un film
  const getRentalByMovieId = (movieId) => {
    return rentals.find(
      (rental) => rental.movieId === movieId || rental.id === movieId,
    );
  };

  // Verifier si un film est dans le panier
  const isInCart = (movieId) => {
    return cart.some((movie) => movie.id === movieId);
  };

  const toggleShow = () => {
    setShowCart((prev) => !prev);
  };

  const value = {
    cart,
    rentals,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    rentMovie,
    rentAllInCart,
    isRented,
    getRentalByMovieId,
    isInCart,
    // Compatibilite avec les composants existants
    cartItems: cart,
    cartCount: getCartCount(),
    showCart,
    toggleShow,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
