import Movie from '../models/Movie.js'
import Rental from '../models/Rental.js'

// @desc    Obtenir tous les films
// @route   GET /api/movies
// @access  Public
export const getAllMovies = async (req, res, next) => {
    try {
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);

        const query = {};
        if (req.query.genre) query.genre = req.query.genre;
        if (req.query.year) query.year = parseInt(req.query.year, 10);
        if (req.query.available === 'true' || req.query.available === 'false') {
            query.isAvailable = req.query.available === 'true';
        }

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const sortOption = { [sortBy]: sortOrder };

        // Pagination
        const skip = (page - 1) * limit;

        // Exécution de la requête
        const movies = await Movie.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit, 10));

        // Comptage total pour la pagination
        const total = await Movie.countDocuments(query);

        res.json({
            success: true,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: movies,
            received: req.interceptedInputs || {
                params: req.params,
                query: req.query,
                body: req.body
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir un films par ID
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Film non trouve'
            });
        }

        res.json({
            success: true,
            data: movie
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Créer un nouveau film
// @route   GET /api/movies
// @access  Private/Admin
export const createMovie = async (req, res, next) => {
    try {
        const {
            title,
            description,
            poster,
            backdrop,
            genre,
            year,
            duration,
            price,
            rating
        } = req.body;

        // Creer le film
        const movie = await Movie.create({
            title,
            description,
            poster,
            backdrop,
            genre,
            year,
            duration,
            price,
            rating
        });

        res.status(201).json({
            success: true,
            message: 'Film cree avec succes',
            data: movie
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Modifier un film
// @route   PUT /api/movies/:id
// @access  Private/Admin
export const updateMovie = async (req, res, next) => {
    try {
        // Mise a jour
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedMovie) {
            return res.status(404).json({
                success: false,
                message: 'Film non trouve'
            });
        }

        res.json({
            success: true,
            message: 'Film mis a jour avec succes',
            data: updatedMovie
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Supprimer un film
// @route   DELETE /api/movies/:id
// @access  Private/Admin
export const deleteMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Film non trouve'
            });
        }

        // Verifier qu'il n'y ait pas de locations associees.
        const rentalsCount = await Rental.countDocuments({ movie: movie._id });
        if (rentalsCount > 0) {
            return res.status(400).json({
                success: false,
                message: 'Suppression impossible: des locations existent pour ce film'
            });
        }

        await movie.deleteOne();

        res.json({
            success: true,
            message: 'Film supprime avec succes'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir les statistiques des films
// @route   GET /api/movies/stats
// @access  Private/Admin
export const getMovieStats = async (req, res, next) => {
    try {
        const totalRevenue = await Movie.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: { $multiply: ['$price', '$rentalCount'] } }
                }
            }
        ]);

        const totalMovies = await Movie.countDocuments();
        const availableMovies = await Movie.countDocuments({ isAvailable: true });

        res.json({
            success: true,
            data: {
                totalMovies,
                availableMovies,
                totalRevenue: totalRevenue[0]?.total || 0
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir des films similaires
// @route   GET /api/movies/:id/similar
// @access  Public
export const getSimilarMovies = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Film non trouve'
            });
        }

        // Trouver des films du meme genre
        const similarMovies = await Movie.find({
            genre: { $in: movie.genre },
            _id: { $ne: movie._id },
            isAvailable: true
        })
            .sort({ rating: -1 })
            .limit(6);

        res.json({
            success: true,
            data: similarMovies
        });
    } catch (error) {
        next(error);
    }
};