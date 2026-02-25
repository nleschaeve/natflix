import { useState, useEffect, useMemo } from 'react';
import MovieHero from '../components/movies/MovieHero';
import MovieCarousel from '../components/movies/MovieCarousel';
import moviesData from '../../../data/movies.json';

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Popular movies (5 random movies)
    const popularMovies = useMemo(() => {
        const shuffled = [...movies].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5);
    }, [movies]);

    // Sci-Fi movies (genre of choice)
    const sciFiMovies = useMemo(() => {
        return movies.filter(movie => movie.genre === 'Science-Fiction').slice(0, 5);
    }, [movies]);

    // Recent movies (after 2010)
    const recentMovies = useMemo(() => {
        return movies.filter(movie => movie.year > 2010).slice(0, 5);
    }, [movies]);

    useEffect(() => {
        // Simuler un chargement asynchrone
        const loadMovies = async () => {
            setLoading(true);
            // Simuler un délai réseau
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMovies(moviesData);
            setLoading(false);
        };
        loadMovies();
    }, []);

    if (loading) {
        return <div className="w-full min-h-screen bg-black flex items-center justify-center text-white text-2xl">Chargement...</div>;
    }

    // Featured movie (first one)
    const featuredMovie = movies[0];

    return (
        <div className="w-full min-h-screen bg-black">
            {/* Featured Movie Hero */}
            <MovieHero movie={featuredMovie} />

            {/* Popular Movies Section */}
            <MovieCarousel title="Films Populaires" movies={popularMovies} />

            {/* Sci-Fi Movies Section */}
            <MovieCarousel title="Science-Fiction" movies={sciFiMovies} />

            {/* Recent Movies Section */}
            <MovieCarousel title="Films Récents" movies={recentMovies} />
        </div>
    );
}

export default Home;
