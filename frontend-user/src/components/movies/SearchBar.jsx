import { useState, useEffect } from 'react';

function SearchBar({ movies = [], onSearch = () => {} }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (searchTerm.length >= 2) {
            const filtered = movies
                .filter(movie =>
                    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    movie.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, 5);
            setSuggestions(filtered);
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [searchTerm, movies]);

    const handleSelect = (movie) => {
        console.log('Film sélectionné :', movie);
        setSearchTerm(movie.title);
        setIsOpen(false);
        onSearch(movie.title);
    };

    const handleFocus = () => {
        if (searchTerm.length >= 2) {
            setIsOpen(true);
        }
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={handleFocus}
                    placeholder="Rechercher un film..."
                    className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                />
                <svg
                    className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            {/* Dropdown de suggestions */}
            {isOpen && suggestions.length > 0 && (
                <ul className="absolute z-20 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
                    {suggestions.map((movie) => (
                        <li
                            key={movie.id}
                            onClick={() => handleSelect(movie)}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
                        >
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-8 h-12 object-cover rounded"
                            />
                            <div>
                                <p className="font-medium">{movie.title}</p>
                                <p className="text-xs text-gray-400">{movie.genre} · {movie.year}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
