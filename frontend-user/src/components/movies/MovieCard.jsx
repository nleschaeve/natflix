import Button from '../common/Button';

// Couleurs par genre
const genreColors = {
    'Action': 'bg-red-500',
    'Comédie': 'bg-yellow-500',
    'Drame': 'bg-blue-500',
    'Science-Fiction': 'bg-purple-500',
    'Horreur': 'bg-orange-500',
    'Thriller': 'bg-gray-500'
};

function MovieCard({ movie }) {
    // Destructurer directement les paramètres
    const { title, description, poster, genre, year, duration, price, rating } = movie;
    return (
        <div className="relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 group/card">
            {/* Image principale */}
            <div className="relative aspect-[2/3]">
                <img
                    src={poster}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {/* Badge de note */}
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
                    <span className="text-yellow-400 font-bold text-sm">
                        ⭐ {rating}
                    </span>
                </div>
                {/* Badge de genre */}
                <div className="absolute bottom-2 left-2">
                    <span className={`${genreColors[genre] || 'bg-gray-500'} text-white text-xs font-bold px-2 py-1 rounded`}>
                        {genre}
                    </span>
                </div>
            </div>
            {/* Overlay au hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <div className="flex items-center space-x-3 mb-3 text-sm">
                    <span className="text-green-400 font-semibold">{rating}/10</span>
                    <span className="text-gray-400">{year}</span>
                    <span className="text-gray-400">{duration}min</span>
                </div>
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm" className="flex-1">
                        ▶ Louer {price}€
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                        + Info
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default MovieCard;