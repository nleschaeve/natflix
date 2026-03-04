import { useCart } from '../../context/CartContext';

function CartButton() {
    const { cartItems, cartCount, showCart, removeFromCart, toggleShow } = useCart();

    return (
        <div className="relative flex">
            <button onClick={toggleShow} className="relative hover:text-gray-300 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        {cartCount}
                    </span>
                )}
            </button>

            {/* Dropdown du panier */}
            {showCart && cartItems.length > 0 && (
                <div className="absolute right-0 mt-8 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4">
                    <h3 className="text-white font-bold mb-1">Mon panier ({cartCount})</h3>
                    <p className="text-gray-400 text-xs mb-3">Double-cliquez sur un film pour le retirer</p>
                    {/* Liste des films */}
                    <ul className="space-y-3">
                        {cartItems.map(item => (
                            <li
                                key={item.id}
                                onDoubleClick={() => removeFromCart(item.id)}
                                className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 rounded p-1 transition select-none"
                                title="Double-cliquez pour retirer"
                            >
                                <img
                                    src={item.poster}
                                    alt={item.title}
                                    className="w-10 h-14 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <p className="text-white text-sm font-medium">{item.title}</p>
                                    <p className="text-gray-400 text-xs">{item.price} €</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 pt-3 border-t border-gray-700 flex justify-between items-center">
                        <span className="text-white font-bold">Total :</span>
                        <span className="text-primary font-bold">
                            {cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)} €
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartButton;
