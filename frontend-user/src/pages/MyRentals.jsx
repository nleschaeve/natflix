import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { getRentals, removeRental } from '../utils/rentalsStorage';

function MyRentals() {
    const navigate = useNavigate();
    const [rentals, setRentals] = useState(() => getRentals());

    const handleRemoveRental = (id) => {
        removeRental(id);
        setRentals((prevRentals) => prevRentals.filter((movie) => movie.id !== id));
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="container mx-auto px-4 pt-28 pb-12">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold">Mes locations</h1>
                    <Button variant="secondary" onClick={() => navigate('/')}>
                        Decouvrir des films
                    </Button>
                </div>

                {rentals.length === 0 ? (
                    <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-8 text-center">
                        <p className="text-xl pb-10 font-semibold">Aucun film en location pour le moment.</p>
                        <Button variant="primary" onClick={() => navigate('/')}>
                            Decouvrir des films
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {rentals.map((movie) => (
                            <article key={movie.id} className="rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-xl">
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="w-full h-80 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
                                    <p className="text-sm text-gray-300 mb-1">{movie.genre} • {movie.year}</p>
                                    <p className="text-sm text-gray-400 mb-3">Duree: {movie.duration} min • Note: {movie.rating}/10</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary font-bold">{movie.price}€</span>
                                        <Button size="sm" variant="outline" onClick={() => handleRemoveRental(movie.id)}>
                                            Retirer
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default MyRentals;