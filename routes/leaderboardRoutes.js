// routes/leaderboardRoutes.js

// Import necessary modules
const express = require('express');  // Import express to create the router
const leaderboardController = require('../controllers/leaderboardController');  // Import the leaderboardController to handle the route logic
const { validateLeaderboard, validateLeaderboardId } = require('../validators/LeaderboardDTO');  // Import validation functions for leaderboard DTO

// Create a new router instance using express.Router()
const router = express.Router();

// Define the routes for handling leaderboard related HTTP requests

// GET request to fetch all leaderboards
router.get('/', (req, res) => leaderboardController.getAllLeaderboards(req, res));

// GET request to fetch a specific leaderboard by its ID
router.get('/:id', validateLeaderboardId, (req, res) => leaderboardController.getLeaderboardById(req, res));

// POST request to create a new leaderboard
router.post('/', validateLeaderboard, (req, res) => leaderboardController.createLeaderboard(req, res));

// PUT request to update an existing leaderboard by its ID
router.put('/:id', [validateLeaderboardId, validateLeaderboard], (req, res) => leaderboardController.updateLeaderboard(req, res));

// DELETE request to remove a leaderboard by its ID
router.delete('/:id', validateLeaderboardId, (req, res) => leaderboardController.deleteLeaderboard(req, res));

// Export the router instance to be used elsewhere
module.exports = router;