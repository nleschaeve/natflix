import Rental from "../models/Rental.js";
import Movie from "../models/Movie.js";
import Uesr from "../models/User.js";

const resolveUserId = async (req) => {
    // Quand l'auth sera branchée, req.user._id sera utilisé automatiquement.
    if (req.user?._id) {
        return req.user._id;
    }

    const fallbackUser = await Uesr.findOne().select("_id");
    return fallbackUser?._id || null;
};

// @desc    Louer un film
// @route   POST /api/rentals
// @access  Private
export const createRental = async (req, res, next) => {
    console.log("fonction createRental");
};

// @desc    Obtenir les locations d'un utilisateur
// @route   GET /api/rentals/my-rentals
// @access  Private
export const getMyRentals = async (req, res, next) => {
    console.log("fonction getMyRentals");
};

// @desc    Obtenir toutes les locations (admin)
// @route   GET /api/rentals
// @access  Private
export const getAllRentals = async (req, res, next) => {
    console.log("fonction getAllRentals");
};

// @desc    Annuler une location
// @route   DELETE /api/rentals/:id
// @access  Private
export const cancelRental = async (req, res, next) => {
    console.log("fonction cancelRental");
};

// @desc    Obtenir les statistiques des locations
// @route   GET /api/rentals/stats
// @access  Private/admin
export const getRentalStats = async (req, res, next) => {
    console.log("fonction getRentalStats");
};

// @desc    Obtenir des recommandations personnalisées
// @route   GET /api/rentals/recommendations
// @access  Private
export const getRecommendations = async (req, res, next) => {
    try {
        // 1. Obtenir les genres des films loués par l'utilisateur.
        // Si pas d'historique, recommander les plus populaires.
        const userId = await resolveUserId(req);
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "Aucun utilisateur disponible pour les recommandations"
            });
        }

        const rentals = await Rental.find({ user: userId }).populate("movie");

        if (rentals.length === 0) {
            const popularMovies = await Movie.find({ isAvailable: true })
                .sort({ rentalCount: -1, rating: -1 })
                .limit(10);

            return res.json({
                success: true,
                message: "Aucun historique: recommandations basees sur la popularite",
                data: popularMovies
            });
        }

        // 2. Compter les genres preferes.
        const genreCount = {};
        rentals.forEach((rental) => {
            const genres = rental.movie?.genre || [];
            genres.forEach((genre) => {
                genreCount[genre] = (genreCount[genre] || 0) + 1;
            });
        });

        // 3. Trier les genres par preference.
        const favoriteGenres = Object.entries(genreCount)
            .sort((a, b) => b[1] - a[1])
            .map(([genre]) => genre);

        // 4. Obtenir les IDs des films deja loues.
        const rentedMovieIds = rentals
            .map((rental) => rental.movie?._id)
            .filter(Boolean);

        // 5. Recommander des films de ces genres non encore loues.
        const recommendations = await Movie.find({
            genre: { $in: favoriteGenres },
            _id: { $nin: rentedMovieIds },
            isAvailable: true
        })
            .sort({ rating: -1, rentalCount: -1 })
            .limit(10);

        res.json({
            success: true,
            preferredGenres: favoriteGenres,
            data: recommendations
        });
    } catch (error) {
        next(error);
    }
};