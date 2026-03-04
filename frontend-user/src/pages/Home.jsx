import { useState, useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import MovieHero from '../components/movies/MovieHero';
import MovieCarousel from '../components/movies/MovieCarousel';
import MovieFilter from '../components/movies/MovieFilter';
import MovieList from '../components/movies/MovieList';
import moviesData from '../../../data/movies.json';

function Home() {
    const [allMovies] = useState(moviesData);
    const [filteredMovies, setFilteredMovies] = useState(allMovies);

    const popularMovies = useMemo(() => {
        return [...allMovies].sort((a, b) => b.rating - a.rating).slice(0, 5);
    }, [allMovies]);

    const recentMovies = useMemo(() => {
        return allMovies.filter(movie => movie.year > 2010).slice(0, 5);
    }, [allMovies]);

    return (
        <div>
            <Navbar />
            <MovieHero movie={allMovies[0]} />
            <div className="container mx-auto">
                <MovieFilter
                    movies={allMovies}
                    onFilter={setFilteredMovies}
                />
                <MovieList
                    title="Films disponibles"
                    movies={filteredMovies}
                />
            </div>

            <MovieCarousel title="Films Populaires" movies={popularMovies} />
            <MovieCarousel title="Films Récents" movies={recentMovies} />

            <Footer />
        </div>
    );
}

export default Home;
