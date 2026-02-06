// Assemble plusieurs composants moléculaires
function MovieList({ movies }) {
    return (
        <div className="grid">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}