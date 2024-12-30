// routes/user-treasureRoutes.js

// Import necessary modules
const express = require('express');  // Import express to create the router
const userTreasureController = require('../controllers/user-treasureController');  // Import the userTreasureController to handle route logic
const { validateUserTreasure, validateUserTreasureId } = require('../validators/user-treasureDTO');  // Import validation functions for userTreasure DTO

// Create a new router instance using express.Router()
const router = express.Router();

// Define the routes for handling user treasure related HTTP requests

// GET request to fetch all user treasures
router.get('/', (req, res) => userTreasureController.getAllUserTreasures(req, res));

// GET request to fetch a specific user treasure by its ID
router.get('/:utid', validateUserTreasureId, (req, res) => userTreasureController.getUserTreasureById(req, res));

// POST request to create a new user treasure
router.post('/', validateUserTreasure, (req, res) => userTreasureController.createUserTreasure(req, res));

// PUT request to update an existing user treasure by its ID
router.put('/:utid', [validateUserTreasureId, validateUserTreasure], (req, res) => userTreasureController.updateUserTreasure(req, res));

// DELETE request to remove a user treasure by its ID
router.delete('/:utid', validateUserTreasureId, (req, res) => userTreasureController.deleteUserTreasure(req, res));

// Export the router instance to be used elsewhere
module.exports = router;