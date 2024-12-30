// routes/gameRoutes.js

// Import necessary modules
const express = require('express');  // Import express to create the router
const gameController = require('../controllers/gameController');  // Import the gameController to handle the route logic
const { validateGame, validateGameId } = require('../validators/gameDTO');  // Import validation functions for game DTO

// Create a new router instance using express.Router()
const router = express.Router();

// Define the routes for handling game related HTTP requests

// GET request to fetch all games
router.get('/', (req, res) => gameController.getAllGames(req, res));

// GET request to fetch a specific game by its ID
router.get('/:id', validateGameId, (req, res) => gameController.getGameById(req, res));

// POST request to create a new game
router.post('/', validateGame, (req, res) => gameController.createGame(req, res));

// POST request to submit an answer to the game
router.post('/:id/submit-answer', (req,res) => gameController.submitAnswer(req,res));

// PUT request to update an existing game by its ID
router.put('/:id', [validateGameId, validateGame], (req, res) => gameController.updateGame(req, res));

// DELETE request to remove a game by its ID
router.delete('/:id', validateGameId, (req, res) => gameController.deleteGame(req, res));

// Export the router instance to be used elsewhere
module.exports = router;