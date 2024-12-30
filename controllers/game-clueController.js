// controllers/game-clueController.js

// Import the services for managing game-clue relationships, games, and clues
const gameClueService = require('../services/game-clueService');
const gameService = require('../services/gameService');
const clueService = require('../services/clueService');

class GameClueController {

    // Handle the request to get all game-clue relationships
    async getAllGameClues(req, res) {
        try {
            // Fetch all game-clue relationships from the gameClueService
            const gameClues = await gameClueService.getAllGameClues();
            // Respond with the list of game-clues and HTTP status 200 (OK)
            res.status(200).json(gameClues);
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error fetching game clues:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Handle the request to get a specific game-clue relationship by its ID (gcid)
    async getGameClueById(req, res) {
        try {
            // Parse the game-clue ID (gcid) from the URL parameter
            const gcid = parseInt(req.params.gcid, 10);
            // Fetch the game-clue by its ID using the gameClueService
            const gameClue = await gameClueService.getGameClueById(gcid);
            // If the game-clue is not found, respond with HTTP status 404 (Not Found)
            if (!gameClue) {
                return res.status(404).json({ message: 'Game clue not found' });
            }
            // Respond with the game-clue data and HTTP status 200 (OK)
            res.status(200).json(gameClue);
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error fetching game clue', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to create a new game-clue relationship
    async createGameClue(req, res) {
        try {
            // Extract the game_id and clue_id from the request body
            const { game_id, clue_id } = req.body;

            // Fetch the game and clue using their respective IDs
            const game = await gameService.getGameById(game_id);
            const clue = await clueService.getClueById(clue_id);

            // If either the game or the clue does not exist, respond with HTTP status 404 (Not Found)
            if (!game || !clue) {
                return res.status(404).json({ message: 'Game or clue not found' });
            }

            // Create a new game-clue relationship using the gameClueService
            const newGameClue = await gameClueService.createGameClue({ game_id, clue_id });
            // Respond with the newly created game-clue relationship and HTTP status 201 (Created)
            res.status(201).json(newGameClue);
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error creating game clue', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to update an existing game-clue relationship
    async updateGameClue(req, res) {
        try {
            // Parse the game-clue ID (gcid) from the URL parameter
            const gcid = parseInt(req.params.gcid, 10);
            // Extract the updated data (game_id and clue_id) from the request body
            const { game_id, clue_id } = req.body;

            // Attempt to update the game-clue relationship using the gameClueService
            const success = await gameClueService.updateGameClue(gcid, { game_id, clue_id });

            // If the game-clue relationship doesn't exist or no changes were made, respond with HTTP status 404 (Not Found)
            if (!success) {
                return res.status(404).json({ message: 'Game clue not found or no changes made' });
            }

            // Fetch the game and clue using their IDs to ensure they are valid
            const game = await gameService.getGameById(game_id);
            const clue = await clueService.getClueById(clue_id);

            // If either the game or clue does not exist, respond with HTTP status 404 (Not Found)
            if (!game || !clue) {
                return res.status(404).json({ message: 'Game or clue not found' });
            }

            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({ message: 'Game clue updated successfully' });
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error updating game clue', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to delete a game-clue relationship
    async deleteGameClue(req, res) {
        try {
            // Parse the game-clue ID (gcid) from the URL parameter
            const gcid = parseInt(req.params.gcid, 10);
            // Attempt to delete the game-clue relationship using the gameClueService
            const success = await gameClueService.deleteGameClue(gcid);

            // If the game-clue relationship is not found, respond with HTTP status 404 (Not Found)
            if (!success) {
                return res.status(404).json({ message: 'Game clue not found' });
            }

            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({ message: 'Game clue deleted successfully' });
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error deleting game clue', e);
            res.status(500).json('internalServerErrorPage');
        }
    }
}

// Export an instance of the GameClueController class to be used in the routes
module.exports = new GameClueController();