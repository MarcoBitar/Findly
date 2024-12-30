// controllers/leaderboardController.js

// Import necessary services to handle leaderboard and user-related operations
const leaderboardService = require('../services/leaderboardService');
const userService = require('../services/userService');

// Define the LeaderboardController class that handles requests related to leaderboards
class LeaderboardController {

    // Handle the request to get all leaderboards
    async getAllLeaderboards(req, res) {
        try {
            // Fetch all leaderboards from the leaderboardService
            const leaderboards = await leaderboardService.getAllLeaderboards();
            
            // Fetch user names for each leaderboard entry
            const leaderboardWithNames = await Promise.all(
                leaderboards.map(async (leaderboard) => {
                    // Fetch the user by user_id from the leaderboard entry
                    const user = await userService.getUserById(leaderboard.user_id);
                    // Attach the username to the leaderboard data
                    return { ...leaderboard, name: user.username };
                })
            );

            // Send the updated leaderboard data (with usernames) to the view
            const data = {
                leaderboards: leaderboardWithNames
            };
            // Render the leaderboard page with the updated data
            res.status(200).render('leaderboardPage', data);
        } catch (e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            // console.error('Error fetching leaderboards:', e);
            // res.status(500).json({ message: 'Internal server error' });
            res.status(500).render('internalServerErrorPage');
        }
    }

    // Handle the request to get a specific leaderboard by its ID
    async getLeaderboardById(req, res) {
        try {
            // Parse the leaderboard ID (id) from the request parameters
            const id = parseInt(req.params.id, 10);
            // Fetch the leaderboard by ID using the leaderboardService
            const leaderboard = await leaderboardService.getLeaderboardById(id);
            // If the leaderboard is not found, respond with 404 (Not Found)
            if (!leaderboard) {
                return res.status(404).json({ message: 'Leaderboard not found' });
            }
            // Respond with the leaderboard data and HTTP status 200 (OK)
            // res.status(200).json(leaderboard);
            res.status(200).render('leaderboardPage', { leaderboard });
        } catch (e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            // console.error('Error fetching leaderboard', e);
            // res.status(500).json({ message: 'Internal server error' });
            res.status(500).render('internalServerErrorPage');
        }
    }

    // Handle the request to create a new leaderboard entry
    async createLeaderboard(req, res) {
        try {
            // Extract data (points_e, user_id) from the request body
            const { points_e, user_id } = req.body;
            // Fetch the user by ID to ensure the user exists before adding to the leaderboard
            const user = await userService.getUserById(user_id);
            // If the user does not exist, respond with 404 (Not Found)
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Create a new leaderboard entry using the leaderboardService
            const newLeaderboard = await leaderboardService.createLeaderboard({ points_e, user_id });
            // Respond with the newly created leaderboard and HTTP status 201 (Created)
            res.status(201).json(newLeaderboard);
        } catch (e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error creating leaderboard', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to update an existing leaderboard entry
    async updateLeaderboard(req, res) {
        try {
            // Parse the leaderboard ID (id) from the request parameters
            const id = parseInt(req.params.id, 10);
            // Extract updated data (points_e, user_id) from the request body
            const { points_e, user_id } = req.body;
            // Update the leaderboard entry by calling the leaderboardService
            const success = await leaderboardService.updateLeaderboard(id, { points_e, user_id });
            // If the leaderboard entry does not exist or no changes were made, respond with 404 (Not Found)
            if (!success) {
                return res.status(404).json({ message: 'Leaderboard not found or no changes made' });
            }
            // Fetch the user by ID to ensure the user exists before updating the leaderboard
            const user = await userService.getUserById(user_id);
            // If the user does not exist, respond with 404 (Not Found)
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({ message: 'Leaderboard updated successfully' });
        } catch (e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error updating leaderboard', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to delete a leaderboard entry
    async deleteLeaderboard(req, res) {
        try {
            // Parse the leaderboard ID (id) from the request parameters
            const id = parseInt(req.params.id, 10);
            // Delete the leaderboard entry by calling the leaderboardService
            const success = await leaderboardService.deleteLeaderboard(id);
            // If the leaderboard entry is not found, respond with 404 (Not Found)
            if (!success) {
                return res.status(404).json({ message: 'Leaderboard not found' });
            }
            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({ message: 'Leaderboard deleted successfully' });
        } catch (e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error deleting leaderboard', e);
            res.status(500).json('internalServerErrorPage');
        }
    }
}

// Export an instance of the LeaderboardController class for use in routes
module.exports = new LeaderboardController();