// routes/clueRoutes.js

// Import necessary modules
const express = require('express');  // Import express to create the router
const clueController = require('../controllers/clueController');  // Import the clue controller for handling the route logic
const { validateClue, validateClueId } = require('../validators/clueDTO');  // Import validation functions for clues

// Create a new router instance using express.Router()
const router = express.Router();

// Define the routes for handling clue related HTTP requests

// GET request to fetch all clues
router.get('/', (req, res) => clueController.getAllClues(req, res));

// GET request to fetch a specific clue by ID
router.get('/:id', validateClueId, (req, res) => clueController.getClueById(req, res));

// POST request to create a new clue
router.post('/', validateClue, (req, res) => clueController.createClue(req, res));

// PUT request to update an existing clue by ID
router.put('/:id', [validateClueId, validateClue], (req, res) => clueController.updateClue(req, res));

// DELETE request to remove a clue by ID
router.delete('/:id', validateClueId, (req, res) => clueController.deleteClue(req, res));

// Export the router instance to be used elsewhere
module.exports = router;