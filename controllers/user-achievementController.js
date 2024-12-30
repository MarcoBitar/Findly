// controllers/user-achievementController.js

// Import the necessary services to handle user-achievement operations
const userAchievementService = require('../services/user-achievementService');
const achievementService = require('../services/achievementService');
const userService = require('../services/userService');

// Define the UserAchievementController class to manage user-achievement related requests
class UserAchievementController {

    // Handle the request to get all user achievements
    async getAllUserAchievements(req, res) {
        try {
            // Fetch all user achievements from the userAchievementService
            const userAchievements = await userAchievementService.getAllUserAchievements();
            // Respond with the user achievements data and HTTP status 200 (OK)
            res.status(200).json(userAchievements);
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error fetching user achievements:', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to get a specific user achievement by its ID
    async getUserAchievementById(req, res) {
        try {
            // Parse the user achievement ID (uaid) from the request parameters
            const uaid = parseInt(req.params.uaid, 10);
            // Fetch the user achievement by ID using the userAchievementService
            const userAchievement = await userAchievementService.getUserAchievementById(uaid);
            // If the user achievement is not found, respond with 404 (Not Found)
            if (!userAchievement)
                return res.status(404).json({message: 'User achievement not found'});
            // Respond with the user achievement data and HTTP status 200 (OK)
            res.status(200).json(userAchievement);
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error fetching user achievement', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to create a new user achievement
    async createUserAchievement(req, res) {
        try {
            // Extract user_id and achievement_id from the request body
            const { user_id, achievement_id } = req.body;
            // Check if the achievement and user exist
            const achievement = await achievementService.getAchievementById(achievement_id);
            const user = await userService.getUserById(user_id);
            // If either the user or the achievement doesn't exist, respond with 404 (Not Found)
            if (!achievement || !user) {
                return res.status(404).json({message: 'User or achievement not found'});
            }
            // Create the new user achievement by calling the userAchievementService
            const newUserAchievement = await userAchievementService.createUserAchievement({ user_id, achievement_id });
            // Respond with the newly created user achievement and HTTP status 201 (Created)
            res.status(201).json(newUserAchievement);
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error creating user achievement', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to update an existing user achievement
    async updateUserAchievement(req, res) {
        try {
            // Parse the user achievement ID (uaid) from the request parameters
            const uaid = parseInt(req.params.uaid, 10);
            // Extract updated user achievement data from the request body
            const { user_id, achievement_id } = req.body;

            // Update the user achievement in the userAchievementService
            const success = await userAchievementService.updateUserAchievement(uaid, { user_id, achievement_id });
            // If no achievement is updated, respond with 404 (Not Found)
            if (!success) {
                return res.status(404).json({message: 'User achievement not found or no changes made'});
            }

            // Verify that both the user and achievement exist after updating
            const achievement = await achievementService.getAchievementById(achievement_id);
            const user = await userService.getUserById(user_id);
            if (!achievement || !user) {
                return res.status(404).json({message: 'Achievement or user not found'});
            }

            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({message: 'User achievement updated successfully'});
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error updating user achievement', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to delete a user achievement
    async deleteUserAchievement(req, res) {
        try {
            // Parse the user achievement ID (uaid) from the request parameters
            const uaid = parseInt(req.params.uaid, 10);
            // Delete the user achievement by calling the userAchievementService
            const success = await userAchievementService.deleteUserAchievement(uaid);
            // If the achievement does not exist, respond with 404 (Not Found)
            if (!success) {
                return res.status(404).json({message: 'User achievement not found'});
            }
            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({message: 'User achievement deleted successfully'});
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error deleting user achievement', e);
            res.status(500).json('internalServerErrorPage');
        }
    }
}

// Export an instance of the UserAchievementController class for use in routes
module.exports = new UserAchievementController();