// routes/user-achievementRoutes.js

// Import necessary modules
const express = require('express');  // Import express to create the router
const userAchievementController = require('../controllers/user-achievementController');  // Import the userAchievementController to handle route logic
const { validateUserAchievement, validateUserAchievementId } = require('../validators/user-achievementDTO');  // Import validation functions for userAchievement DTO

// Create a new router instance using express.Router()
const router = express.Router();

// Define the routes for handling user achievement related HTTP requests

// GET request to fetch all user achievements
router.get('/', (req, res) => userAchievementController.getAllUserAchievements(req, res));

// GET request to fetch a specific user achievement by its ID
router.get('/:uaid', validateUserAchievementId, (req, res) => userAchievementController.getUserAchievementById(req, res));

// POST request to create a new user achievement
router.post('/', validateUserAchievement, (req, res) => userAchievementController.createUserAchievement(req, res));

// PUT request to update an existing user achievement by its ID
router.put('/:uaid', [validateUserAchievementId, validateUserAchievement], (req, res) => userAchievementController.updateUserAchievement(req, res));

// DELETE request to remove a user achievement by its ID
router.delete('/:uaid', validateUserAchievementId, (req, res) => userAchievementController.deleteUserAchievement(req, res));

// Export the router instance to be used elsewhere
module.exports = router;