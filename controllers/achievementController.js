// controllers/achievementController.js

// Importing the service layer to interact with the achievement data
const achievementService = require('../services/achievementService');

class AchievementController {

    // Handle the request to get all achievements
    async getAllAchievements(req, res) {
        try {
            // Fetch all achievements from the achievementService
            const achievements = await achievementService.getAllAchievements();
            const data = {
                achievements: achievements
            }
            // Respond with the list of achievements and HTTP status 200 (OK)
            // res.status(200).json(achievements);
            res.status(200).render('achievementsPage', data);
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            // console.error('Error fetching achievements:', e);
            // res.status(500).json({ message: 'Internal server error' });
            res.status(500).render('internalServerErrorPage');
        }
    }

    // Handle the request to get a specific achievement by its ID
    async getAchievementById(req, res) {
        try {
            // Parse the achievement ID from the URL parameter
            const id = parseInt(req.params.id, 10);
    
            // Fetch the achievement by its ID using the achievementService
            const achievement = await achievementService.getAchievementById(id);
    
            // If the achievement is not found, respond with HTTP status 404 (Not Found)
            if (!achievement) {
                return res.status(404).render('achievementsPage', { error: 'Achievement not found' });
            }
    
            // Respond with the achievement data and HTTP status 200 (OK)
            res.status(200).render('achievementPage', { achievement });
        } catch (e) {
            // Log the error for debugging
            console.error('Error fetching achievement:', e);
            res.status(500).render('internalServerErrorPage');
        }
    }
    

    // Handle the request to create a new achievement
    async createAchievement(req, res) {
        try {
            // Extract the name, category, description, and points from the request body
            const { name, category, descr, pointsr } = req.body;
            // Create the new achievement using the achievementService
            const newAchievement = await achievementService.createAchievement({ name, category, descr, pointsr });
            // Respond with the newly created achievement and HTTP status 201 (Created)
            res.status(201).json(newAchievement);
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error creating achievement', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to update an existing achievement
    async updateAchievement(req, res) {
        try {
            // Parse the achievement ID from the URL parameter
            const id = parseInt(req.params.id, 10);
            // Extract the updated name, category, description, and points from the request body
            const { name, category, descr, pointsr } = req.body;
            // Attempt to update the achievement using the achievementService
            const success = await achievementService.updateAchievement(id, { name, category, descr, pointsr });
            // If the achievement is not found or no changes were made, respond with HTTP status 404 (Not Found)
            if (!success) {
                return res.status(404).json({ message: 'Achievement not found or no changes made' });
            }
            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({ message: 'Achievement updated successfully' });
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error updating achievement', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to delete an achievement
    async deleteAchievement(req, res) {
        try {
            // Parse the achievement ID from the URL parameter
            const id = parseInt(req.params.id, 10);
            // Attempt to delete the achievement using the achievementService
            const success = await achievementService.deleteAchievement(id);
            // If the achievement is not found, respond with HTTP status 404 (Not Found)
            if (!success) {
                return res.status(404).json({ message: 'Achievement not found' });
            }
            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({ message: 'Achievement deleted successfully' });
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error deleting achievement', e);
            res.status(500).json('internalServerErrorPage');
        }
    }
}

// Export the controller instance to be used in the routes
module.exports = new AchievementController();