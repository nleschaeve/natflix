import { useMemo, useState } from 'react';
import MovieHero from '../components/movies/MovieHero';
import MovieCarousel from '../components/movies/MovieCarousel';
import moviesData from '../../../data/movies.json';

function Home() {
    // Featured movie (first one)
    const featuredMovie = moviesData[0];

    // Popular movies (5 random movies) - initializer function runs once
    const [popularMovies] = useState(() => {
        const shuffled = [...moviesData].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5);
    });

    // Sci-Fi movies (genre of choice)
    const sciFiMovies = useMemo(() => {
        return moviesData.filter(movie => movie.genre === 'Science-Fiction').slice(0, 5);
    }, []);

    // Recent movies (after 2010)
    const recentMovies = useMemo(() => {
        return moviesData.filter(movie => movie.year > 2010).slice(0, 5);
    }, []);

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
