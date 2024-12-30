// controllers/game-userController.js

// Import the services for game-user relationships, games, and users
const gameUserService = require('../services/game-userService');
const gameService = require('../services/gameService');
const userService = require('../services/userService');

class GameUserController {

    // Handle the request to get all game-user relationships
    async getAllGameUsers(req, res) {
        try {
            // Fetch all game-user relationships from the gameUserService
            const gameUsers = await gameUserService.getAllGameUsers();
            // Respond with the list of game users and HTTP status 200 (OK)
            res.status(200).json(gameUsers);
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error fetching game users:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Handle the request to get a specific game-user relationship by its ID (guid)
    async getGameUserById(req, res) {
        try {
            // Parse the game-user ID (guid) from the URL parameter
            const guid = parseInt(req.params.guid, 10);
            // Fetch the game-user by its ID using the gameUserService
            const gameUser = await gameUserService.getGameUserById(guid);
            // If the game-user is not found, respond with HTTP status 404 (Not Found)
            if (!gameUser) {
                return res.status(404).json({ message: 'Game user not found' });
            }
            // Respond with the game-user data and HTTP status 200 (OK)
            res.status(200).json(gameUser);
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error fetching game user', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to create a new game-user relationship
    async createGameUser(req, res) {
        try {
            // Extract the game_id, user_id, score, and status from the request body
            const { game_id, user_id, score, status } = req.body;

            // Fetch the game and user using their IDs
            const game = await gameService.getGameById(game_id);
            const user = await userService.getUserById(user_id);

            // If either the game or user does not exist, respond with HTTP status 404 (Not Found)
            if (!game || !user) {
                return res.status(404).json({ message: 'Game or user not found' });
            }

            // Create a new game-user relationship using the gameUserService
            const newGameUser = await gameUserService.createGameUser({ game_id, user_id, score, status });
            // Respond with the newly created game-user relationship and HTTP status 201 (Created)
            res.status(201).json(newGameUser);
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error creating game user', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to update an existing game-user relationship
    async updateGameUser(req, res) {
        try {
            // Parse the game-user ID (guid) from the URL parameter
            const guid = parseInt(req.params.guid, 10);
            // Extract the updated data (game_id, user_id, score, status) from the request body
            const { game_id, user_id, score, status } = req.body;

            // Attempt to update the game-user relationship using the gameUserService
            const success = await gameUserService.updateGameUser(guid, { game_id, user_id, score, status });

            // If the game-user relationship doesn't exist or no changes were made, respond with HTTP status 404 (Not Found)
            if (!success) {
                return res.status(404).json({ message: 'Game user not found or no changes made' });
            }

            // Fetch the game and user using their IDs to ensure they are valid
            const game = await gameService.getGameById(game_id);
            const user = await userService.getUserById(user_id);

            // If either the game or user does not exist, respond with HTTP status 404 (Not Found)
            if (!game || !user) {
                return res.status(404).json({ message: 'Game or user not found' });
            }

            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({ message: 'Game user updated successfully' });
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error updating game user', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to delete a game-user relationship
    async deleteGameUser(req, res) {
        try {
            // Parse the game-user ID (guid) from the URL parameter
            const guid = parseInt(req.params.guid, 10);
            // Attempt to delete the game-user relationship using the gameUserService
            const success = await gameUserService.deleteGameUser(guid);

            // If the game-user relationship is not found, respond with HTTP status 404 (Not Found)
            if (!success) {
                return res.status(404).json({ message: 'Game user not found' });
            }

            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({ message: 'Game user deleted successfully' });
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error deleting game user', e);
            res.status(500).json('internalServerErrorPage');
        }
    }
}

// Export an instance of the GameUserController class to be used in the routes
module.exports = new GameUserController();