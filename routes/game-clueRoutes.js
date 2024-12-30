// routes/game-clueRoutes.js

// Import necessary modules
const express = require('express');  // Import express to create the router
const gameClueController = require('../controllers/game-clueController');  // Import the gameClue controller for handling the route logic
const { validateGameClue, validateGameClueId } = require('../validators/game-clueDTO');  // Import validation functions for game-clues

// Create a new router instance using express.Router()
const router = express.Router();

// Define the routes for handling game-clue related HTTP requests

// GET request to fetch all game-clue associations
router.get('/', (req, res) => gameClueController.getAllGameClues(req, res));

// GET request to fetch a specific game-clue association by GCID (game clue ID)
router.get('/:gcid', validateGameClueId, (req, res) => gameClueController.getGameClueById(req, res));

// POST request to create a new game-clue association
router.post('/', validateGameClue, (req, res) => gameClueController.createGameClue(req, res));

// PUT request to update an existing game-clue association by GCID
router.put('/:gcid', [validateGameClueId, validateGameClue], (req, res) => gameClueController.updateGameClue(req, res));

// DELETE request to remove a game-clue association by GCID
router.delete('/:gcid', validateGameClueId, (req, res) => gameClueController.deleteGameClue(req, res));

// Export the router instance to be used elsewhere
module.exports = router;