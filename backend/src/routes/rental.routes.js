import express from 'express';
import {
	getAllRentals,
	getMyRentals,
	getRentalStats,
	createRental,
	cancelRental,
	getRecommendations
} from '../controller/rental.controller.js';
// import { protect, admin } from '../middleware/auth.middleware.js'; // Séance 9

const router = express.Router();

// Routes publiques temporaires (auth forcée plus tard)
router.get('/', getAllRentals);
router.get('/my-rentals', getMyRentals);
router.get('/recommendations', getRecommendations);
router.get('/stats', getRentalStats);
router.post('/', createRental);
router.delete('/:id', cancelRental);

export default router;
