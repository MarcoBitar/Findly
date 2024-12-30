// routes/game-userRoutes.js

// Import necessary modules
const express = require('express');  // Import express to create the router
const gameUserController = require('../controllers/game-userController');  // Import the gameUser controller to handle the route logic
const { validateGameUser, validateGameUserId } = require('../validators/game-userDTO');  // Import validation functions for game-user DTO

// Create a new router instance using express.Router()
const router = express.Router();

// Define the routes for handling game-user related HTTP requests

// GET request to fetch all game-user associations
router.get('/', (req, res) => gameUserController.getAllGameUsers(req, res));

// GET request to fetch a specific game-user association by GUID (game user ID)
router.get('/:guid', validateGameUserId, (req, res) => gameUserController.getGameUserById(req, res));

// POST request to create a new game-user association
router.post('/', validateGameUser, (req, res) => gameUserController.createGameUser(req, res));

// PUT request to update an existing game-user association by GUID
router.put('/:guid', [validateGameUserId, validateGameUser], (req, res) => gameUserController.updateGameUser(req, res));

// DELETE request to remove a game-user association by GUID
router.delete('/:guid', validateGameUserId, (req, res) => gameUserController.deleteGameUser(req, res));

// Export the router instance to be used elsewhere
module.exports = router;