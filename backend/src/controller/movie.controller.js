import Movie from '../models/Movie.js'

// @desc    Obtenir tous les films
// @route   GET /api/movies
// @access  Public
export const getAllMovies = async (req, res, next) => {
};

// @desc    Obtenir un films par ID
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (req, res, next) => {
    console.log("fonction getMovieById");
};

// @desc    Créer un nouveau film
// @route   GET /api/movies
// @access  Private/Admin
export const createMovie = async (req, res, next) => {
    console.log("fonction createMovie");
};

// @desc    Modifier un film
// @route   PUT /api/movies/:id
// @access  Private/Admin
export const updateMovie = async (req, res, next) => {
    console.log("fonction updateMovie");
};

// @desc    Supprimer un film
// @route   DELETE /api/movies/:id
// @access  Private/Admin
export const deleteMovie = async (req, res, next) => {
    console.log("fonction deleteMovie");
};

// @desc    Obtenir les statistiques des films
// @route   GET /api/movies/stats
// @access  Private/Admin
export const getMovieStats = async (req, res, next) => {
    console.log("fonction getMovieStats");
};