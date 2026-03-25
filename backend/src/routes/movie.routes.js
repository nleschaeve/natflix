import express from 'express';
import {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieStats,
    getSimilarMovies
} from '../controller/movie.controller.js';
// import { protect, admin } from '../middleware/auth.middleware.js'; // Séance 9

const router = express.Router();

// Intercepte les paramètres transmis via la route, la query string et le body.
const interceptRequestParams = (req, res, next) => {
    req.interceptedInputs = {
        params: { ...req.params },
        query: { ...req.query },
        body: { ...req.body }
    };

    next();
};

// Routes publiques
router.get('/', interceptRequestParams, getAllMovies);
router.get('/stats', interceptRequestParams, getMovieStats); // TODO: Protéger avec admin (séance 9)
router.get('/:id', interceptRequestParams, getMovieById);
router.get('/:id/similar', interceptRequestParams, getSimilarMovies);

// Routes protégées admin (sera activé séance 9)
// router.post('/', protect, admin, createMovie);
// router.put('/:id', protect, admin, updateMovie);
// router.delete('/:id', protect, admin, deleteMovie);

// Routes temporaires sans authentification (pour tester)
router.post('/', interceptRequestParams, createMovie);
router.put('/:id', interceptRequestParams, updateMovie);
router.delete('/:id', interceptRequestParams, deleteMovie);

export default router;