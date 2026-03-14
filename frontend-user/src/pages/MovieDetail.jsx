import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moviesData from '../../../data/movies.json';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import MovieDescription from '../components/movies/MovieDescription';
import { addRental } from '../utils/rentalsStorage';

function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleRentClick = () => {
        if (movie) {
            addRental(movie);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const found = moviesData.find(m => m.id === parseInt(id));
            setMovie(found ?? null);
            setLoading(false);
        }, 0);
        return () => clearTimeout(timer);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="text-white text-xl animate-pulse">Chargement du film...</p>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
                <p className="text-white text-3xl font-bold">Film introuvable</p>
                <p className="text-gray-400 text-sm">Le film que vous cherchez n'existe pas.</p>
                <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Backdrop pleine page + bouton retour */}
            <div className="relative h-screen w-full">
                <img
                    src={movie.backdrop}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />

                {/* Bouton retour */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-24 left-6 flex items-center gap-2 text-white bg-black/40 hover:bg-black/70 px-4 py-2 rounded transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour
                </button>

                {/* Titre en bas du backdrop */}
                <div className="absolute bottom-16 left-8">
                    <h1 className="text-5xl md:text-7xl font-bold drop-shadow-2xl">{movie.title}</h1>
                    <div className="flex items-center flex-wrap gap-3 mt-3">
                        <span className="bg-primary px-3 py-1 rounded text-sm font-bold">{movie.rating}/10</span>
                        <span className="text-gray-300">{movie.year}</span>
                        <span className="text-gray-300">{movie.duration} min</span>
                        <span className="border border-gray-500 px-2 py-0.5 text-sm rounded">{movie.genre}</span>
                    </div>
                </div>
            </div>

            {/* Infos du film + poster */}
            <div className="container mx-auto px-0 py-12">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Détails */}
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-4">Synopsis</h2>
                        <MovieDescription description={movie.description} />
                        <div className="mt-6">
                            <Button size="lg" onClick={handleRentClick}>
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                                Louer pour {movie.price}€
                            </Button>
                        </div>
                        <div className="mt-8 p-10 overflow-hidden rounded-xl bg-gray-900 text-gray-300">
                            <h3 className="text-2xl font-bold">Informations</h3>
                            <div className="flex items-center py-4 border-b border-gray-700">
                                <p className="font-semibold text-gray-400 w-30">Genre :</p>
                                <p className="font-semibold">{movie.genre}</p>
                            </div>
                            <div className="flex items-center py-4 border-b border-gray-700">
                                <p className="font-semibold text-gray-400 w-30">Année</p>
                                <p className="font-semibold text-white">{movie.year}</p>
                            </div>
                            <div className="flex items-center py-4 border-b border-gray-700">
                                <p className="font-semibold text-gray-400 w-30">Durée</p>
                                <p className="font-semibold text-white">{movie.duration} min</p>
                            </div>
                            <div className="flex items-center py-4 border-b border-gray-700">
                                <p className="font-semibold text-gray-400 w-30">Note</p>
                                <p className="font-semibold text-white">{movie.rating}/10</p>
                            </div>
                            <div className="flex items-center py-4 border-b border-gray-700">
                                <p className="font-semibold text-gray-400 w-30">Prix</p>
                                <p className="font-semibold text-white">{movie.price} €</p>
                            </div>
                        </div>
                    </div>

                    {/* Poster */}
                    <div className="shrink-0">
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-80 md:w-96 lg:w-md rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default MovieDetail;