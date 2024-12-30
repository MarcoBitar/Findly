// routes/achievementRoutes.js

// Import necessary modules
const express = require('express');  // Import express to create the router
const achievementController = require('../controllers/achievementController');  // Import the achievement controller to handle the logic for each route
const { validateAchievement, validateAchievementById } = require('../validators/achievementDTO');  // Import validation functions for request data

// Create a new router instance using express.Router()
const router = express.Router();

// Define the routes for handling achievement related HTTP requests

// GET request to fetch all achievements
router.get('/', (req, res) => achievementController.getAllAchievements(req, res));

// GET request to fetch a specific achievement by ID
router.get('/:id', validateAchievementById, (req, res) => achievementController.getAchievementById(req, res));

// POST request to create a new achievement
router.post('/', validateAchievement, (req, res) => achievementController.createAchievement(req, res));

// PUT request to update an existing achievement by ID
router.put('/:id', [validateAchievementById, validateAchievement], (req, res) => achievementController.updateAchievement(req, res));

// DELETE request to remove an achievement by ID
router.delete('/:id', validateAchievementById, (req, res) => achievementController.deleteAchievement(req, res));

// Export the router instance to be used elsewhere
module.exports = router;