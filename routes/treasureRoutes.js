// routes/treasureRoutes.js

// Import necessary modules
const express = require('express');  // Import express to create the router
const treasureController = require('../controllers/treasureController');  // Import the treasureController to handle route logic
const { validateTreasure, validateTreasureId } = require('../validators/treasureDTO');  // Import validation functions for treasure DTO

// Create a new router instance using express.Router()
const router = express.Router();

// Define the routes for handling treasure related HTTP requests

// GET request to fetch all treasures
router.get('/', (req, res) => treasureController.getAllTreasures(req, res));

// GET request to fetch a specific treasure by its ID
router.get('/:id', validateTreasureId, (req, res) => treasureController.getTreasureById(req, res));

// POST request to create a new treasure
router.post('/', validateTreasure, (req, res) => treasureController.createTreasure(req, res));

// POST request to submit an answer to the treasure
router.post('/:id/submit-answer', (req,res) => treasureController.submitAnswer(req,res));

// PUT request to update an existing treasure by its ID
router.put('/:id', [validateTreasureId, validateTreasure], (req, res) => treasureController.updateTreasure(req, res));

// DELETE request to remove a treasure by its ID
router.delete('/:id', validateTreasureId, (req, res) => treasureController.deleteTreasure(req, res));

// Export the router instance to be used elsewhere
module.exports = router;