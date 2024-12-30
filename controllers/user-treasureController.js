// controllers/user-treasureController.js

// Import the necessary services to handle user-treasure operations
const userTreasureService = require('../services/user-treasureService');
const treasureService = require('../services/treasureService');
const userService = require('../services/userService');

// Define the UserTreasureController class to manage user-treasure related requests
class UserTreasureController {

    // Handle the request to get all user treasures
    async getAllUserTreasures(req, res) {
        try {
            // Fetch all user treasures from the userTreasureService
            const userTreasures = await userTreasureService.getAllUserTreasures();
            // Respond with the user treasures data and HTTP status 200 (OK)
            res.status(200).json(userTreasures);
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error fetching user treasures:', e);
            res.status(500).render('internalServerErrorPage');
        }
    }

    // Handle the request to get a specific user treasure by its ID
    async getUserTreasureById(req, res) {
        try {
            // Parse the user treasure ID (utid) from the request parameters
            const utid = parseInt(req.params.utid, 10);
            // Fetch the user treasure by ID using the userTreasureService
            const userTreasure = await userTreasureService.getUserTreasureById(utid);
            // If the user treasure is not found, respond with 404 (Not Found)
            if (!userTreasure)
                return res.status(404).json({message: 'User treasure not found'});
            // Respond with the user treasure data and HTTP status 200 (OK)
            res.status(200).json(userTreasure);
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error fetching user treasure', e);
            res.status(500).render('internalServerErrorPage');
        }
    }

    // Handle the request to create a new user treasure
    async createUserTreasure(req, res) {
        try {
            // Extract user_treasure data from the request body (user_id, treasure_id, is_v)
            const { user_id, treasure_id, is_v } = req.body;
            // Check if the treasure and user exist
            const treasure = await treasureService.getTreasureById(treasure_id);
            const user = await userService.getUserById(user_id);
            // If either the user or the treasure doesn't exist, respond with 404 (Not Found)
            if (!treasure || !user) {
                return res.status(404).json({message: 'User or treasure not found'});
            }
            // Create the new user treasure by calling the userTreasureService
            const newUserTreasure = await userTreasureService.createUserTreasure({ user_id, treasure_id, is_v });
            // Respond with the newly created user treasure and HTTP status 201 (Created)
            res.status(201).json(newUserTreasure);
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error creating user treasure', e);
            res.status(500).render('internalServerErrorPage');
        }
    }

    // Handle the request to update an existing user treasure
    async updateUserTreasure(req, res) {
        try {
            // Parse the user treasure ID (utid) from the request parameters
            const utid = parseInt(req.params.utid, 10);
            // Extract the updated user treasure data from the request body
            const { user_id, treasure_id, is_v } = req.body;

            // Update the user treasure in the userTreasureService
            const success = await userTreasureService.updateUserTreasure(utid, { user_id, treasure_id, is_v });
            // If no treasure is updated, respond with 404 (Not Found)
            if (!success) {
                return res.status(404).json({message: 'User treasure not found or no changes made'});
            }

            // Verify that both the user and treasure exist after updating
            const treasure = await treasureService.getTreasureById(treasure_id);
            const user = await userService.getUserById(user_id);
            if (!treasure || !user) {
                return res.status(404).json({message: 'Treasure or user not found'});
            }

            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({message: 'User treasure updated successfully'});
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error updating user treasure', e);
            res.status(500).render('internalServerErrorPage');
        }
    }

    // Handle the request to delete a user treasure
    async deleteUserTreasure(req, res) {
        try {
            // Parse the user treasure ID (utid) from the request parameters
            const utid = parseInt(req.params.utid, 10);
            // Delete the user treasure by calling the userTreasureService
            const success = await userTreasureService.deleteUserTreasure(utid);
            // If the treasure does not exist, respond with 404 (Not Found)
            if (!success) {
                return res.status(404).json({message: 'User treasure not found'});
            }
            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({message: 'User treasure deleted successfully'});
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error deleting user treasure', e);
            res.status(500).render('internalServerErrorPage');
        }
    }
}

// Export an instance of the UserTreasureController class for use in routes
module.exports = new UserTreasureController();