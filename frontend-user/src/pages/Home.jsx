import { useMemo, useState } from 'react';
import MovieHero from '../components/movies/MovieHero';
import MovieList from '../components/movies/MovieList';
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
            <section className="container mx-auto">
                <MovieList title="Films Populaires" movies={popularMovies} />
            </section>

            {/* Sci-Fi Movies Section */}
            <section className="container mx-auto">
                <MovieList title="Science-Fiction" movies={sciFiMovies} />
            </section>

            {/* Recent Movies Section */}
            <section className="container mx-auto pb-12">
                <MovieList title="Films Récents" movies={recentMovies} />
            </section>
        </div>
    );
}

export default Home;
